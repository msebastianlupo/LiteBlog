import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("LB")
const users = db.collection('Users')
const tokens = db.collection('Tokens')

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

async function getUsers(query = {}){
    await client.connect()
    const queryMongo = filterQuery(query)
    queryMongo.disabled = {$exists: false}
    return users.find(queryMongo)
    .sort( {email: 1 })
    .toArray()
}

function validateObjectId(id){
    return ObjectId.isValid(id)
}

async function findUser(id){
    await client.connect()
    if(validateObjectId(id)){
        const user = await users.findOne({
            _id: new ObjectId(id),
            disabled: {$exists: false}
        })
        if(user){
            return user;
        }
    }
    throw(404)
}

async function checkUserExists(filter = {}){
    await client.connect()
    const user = await users.findOne(filter)
    return user ? true : false
}

async function createUser(data){
    if(!await checkUserExists({email: data.email})){
        await client.connect()
        const dataCopy = {...data}
        if(!dataCopy.role){
            dataCopy.role = "editor"
        }
        const salt = await bcrypt.genSalt(10)
        dataCopy.password = await bcrypt.hash(data.password, salt)
        await users.insertOne(dataCopy)
        await users.createIndex( { email: 1 }, { unique: true } )
        return dataCopy
    }
    throw(400)
}

async function modifyUser(id, data){
    await client.connect()
    const dataCopy = {...data}
    if(validateObjectId(id)){
        if(dataCopy.password){
            const salt = await bcrypt.genSalt(10)
            dataCopy.password = await bcrypt.hash(data.password, salt)
        }
        const update = await users.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {$set: dataCopy},
            {returnDocument: "after"}
        )
        if(update){
            return update.value
        }else{
            throw(500)
        }
    }
    throw(404)
}

async function deleteUser(id){
    await client.connect()
    if(validateObjectId(id)){
        const disabled = await users.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {$set: {disabled: true}},
            {returnDocument: "after"}
        )
        if(disabled){
            return disabled.value
        }
        throw(500)
    }
    throw(404)
}

async function verifyAccount(data){
    await client.connect()
    const user = await users.findOne({email: data.email})
    if(user && !user.disabled){
        if(await bcrypt.compare(data.password, user.password)){
            return {...user, password: undefined}
        }else{
            throw(401)
        }
    }
    throw(404)
}

async function createToken(payload){
    const token = jwt.sign(payload, "CLAVE SECRETA")
    tokens.insertOne({token, email: payload.email})
    return token
}

async function loginUser(data){
    const account = await verifyAccount({...data})
    return {
        account: account,
        token: await createToken(account)
    }
}

async function verifyToken(token){
    await client.connect()
    const payload = jwt.verify(token, "CLAVE SECRETA")
    if(!await tokens.findOne({token})){
        throw(404)
    }
    return payload
}

async function logOutUser(token){
    await client.connect()
    tokens.deleteOne({token})
}

async function restorePassword(email, data){
    await client.connect()
    const dataCopy = {...data}
    const salt = await bcrypt.genSalt(10)
    dataCopy.password = await bcrypt.hash(data.password, salt)
    
    const update = await users.findOneAndUpdate(
        {email: email},
        {$set: dataCopy},
        {returnDocument: "after"}
    )
    if(update){
        return update.value
    }
    throw(404)
}

async function findByEmail(email){
    await client.connect()
    const user = await users.findOne({
        email: email,
        disabled: {$exists: false}
    })
    if(user){
        return user
    }
    throw(404)
}

export {
    getUsers,
    findUser,
    checkUserExists,
    createUser,
    modifyUser,
    deleteUser,
    loginUser,
    logOutUser,
    verifyToken,
    restorePassword,
    findByEmail
}