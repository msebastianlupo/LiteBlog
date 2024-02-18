import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("LB")
const comments = db.collection('Comments')

function filterQuery(query){
    const filter = {}
    for(let q in query){
        if(isNaN(query[q])){
            filter[q] = query[q]
        }else{
            filter[q] = parseInt(query[q])
        }
    }
    return filter
}

async function getComments(postId){
    await client.connect()
    return comments.findOne({post: postId})
}

function validateObjectId(id){
    return ObjectId.isValid(id)
}

async function createComments(postId){
    await client.connect()
    const prepared = await comments.insertOne({
        "post": postId,
        "comments": []
    })
    return prepared
}

async function pushComment(postId, data){
    await client.connect()
    const dataCopy = {...data, date: new Date()}
    await comments.updateOne(
        {post: postId},
        {$push: {comments: dataCopy}}
    )
    return dataCopy
}

async function deleteComments(postId){
    await client.connect()
    if(validateObjectId(postId)){
        const deleted = await comments.findOneAndDelete({post: postId})
        if(deleted.value){
            return deleted
        }
        throw(400)
    }
    throw(404)
}

export {
    getComments,
    createComments,
    pushComment,
    deleteComments
}