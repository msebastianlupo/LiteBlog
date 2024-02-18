import { MongoClient } from "mongodb"
import nodemailer from 'nodemailer'
import { findByEmail } from "./users.js"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("LB")
const passwords = db.collection('Passwords')

function generateRandom(){
    let random = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    for (let i = 1; i <= 10; i++) {
        let char = Math.floor(Math.random()
            * characters.length + 1)
        random += characters.charAt(char)
    }
    return random;
}

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

async function sendCode(data){
    const dataCopy = { ...data }
    await transporter.sendMail({
        from: 'LiteBlog',
        to: dataCopy.email,
        subject: "Código de recuperación de contraseña",
        html: `
            <h1>¿Olvidaste tu contraseña?</h1>
            <p>Ingresá el siguiente código para recuperar tu clave</p>
            <b style="martin-top: 20px; padding: 10px; border: 1px solid #aaaaaa">${dataCopy.hash}</b>
        `
    })
}


async function createPassword(data){
    await client.connect()
    const dataCopy = { ...data }
    if(await findByEmail(dataCopy.email)){
        dataCopy.hash = generateRandom()
        dataCopy.created = new Date()
        await sendCode(dataCopy)
        await passwords.insertOne( dataCopy )
        await passwords.createIndex({created: 1}, {expireAfterSeconds: 3600})
        return dataCopy
    }else{
        throw(404)
    }
}

async function deleteHash(data){
    await client.connect()
    const dataCopy = {...data}
    const deleted = await passwords.findOneAndDelete(dataCopy)
    if(deleted.value){
        return deleted.value
    }
    throw(404)
}

export {
    createPassword,
    deleteHash
}