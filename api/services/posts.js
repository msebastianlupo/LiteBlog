import { MongoClient, ObjectId } from "mongodb"
import { createComments, deleteComments } from "./comments.js"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("LB")
const posts = db.collection('Posts')

function filterQuery(query){
    const filter = {}
    if(query.title){
       return { $text: { $search: query.title }}
    }else{
        for(let q in query){
            if(isNaN(query[q])){
                filter[q] = query[q]
            }else{
                filter[q] = parseInt(query[q])
            }
        }
    }
    return filter
}

async function getPosts(query = {}){
    await client.connect()
    const queryMongo = filterQuery(query)
    return fixDate(posts.find(queryMongo))
    .sort({_id:-1})
    .toArray()
}

function validateObjectId(id){
    return ObjectId.isValid(id)
}

async function findPost(id){
    await client.connect()
    if(validateObjectId(id)){
        const post = await posts.findOne({
            _id: new ObjectId(id),
        },{proyection: {
            title: 1
        }
    })
        if(post){
            return post;
        }
    }
    throw(404)
}

async function findUserPost(userId, postId){
    await client.connect()
    if(validateObjectId(userId) && validateObjectId(postId)){
        const post = await posts.findOne({
            _id: new ObjectId(postId),
            user: userId
        })
        if(post){
            return post;
        }
    }
    throw(404)
}

async function checkPostExists(filter = {}){
    await client.connect()
    const post = await posts.findOne(filter)
    return post ? true : false
}

async function createPost(userId, data){
    if(!await checkPostExists({title: data.title})){
        await client.connect()
        const dataCopy = {...data, created: new Date()}
        dataCopy.user = userId
        await posts.insertOne(dataCopy)
        await posts.createIndex({ title: "text" })
        createComments(dataCopy._id.toString())
        return dataCopy
    }
    throw(400)
}

async function modifyPost(postId, data){
    await client.connect()
    if(validateObjectId(postId)){
        const dataCopy = {...data, updated: new Date()}
        const update = await posts.updateOne(
            {_id: new ObjectId(postId)},
            {$set: dataCopy}
        )
        if(update.modifiedCount){
            return dataCopy
        }else{
            throw(400)
        }
    }
    throw(404)
}

async function deletePost(id){
    await client.connect()
    if(validateObjectId(id)){
        const deleted = await posts.findOneAndDelete(
            {_id: new ObjectId(id)}
        )
        if(deleted.value){
            await deleteComments(id)
            return deleted.value
        }
        throw(400)
    }
    throw(404)
}

async function getUserPosts(userId, query = {}){
    await client.connect()
    const queryMongo = filterQuery(query)
    queryMongo.user = userId
    return fixDate(posts.find(queryMongo))
    .toArray()
}

function fixDate(cursor){
    return cursor.project({
        created: {$dateToString: {format: "%G-%m-%d, %H:%M",date: "$created"}},
        title: "$title",
        category: "$category",
        text: "$text"
    })
}

export {
    getPosts,
    findPost,
    findUserPost,
    checkPostExists,
    createPost,
    modifyPost,
    deletePost,
    getUserPosts,
}