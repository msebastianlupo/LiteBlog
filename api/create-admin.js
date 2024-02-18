import { checkUserExists, createUser } from "./services/users.js"

async function createAdmin(){
   const exists = await checkUserExists({email: 'admin@lb.ar'})
    if(!exists){
        const created = await createUser(
            {
                email: "admin@lb.ar",
                password: "12345678",
                role: "admin"
            }
        )
        return created ? true : false
    }
    return false
}

export {
    createAdmin
}