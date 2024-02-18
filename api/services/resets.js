import { restorePassword } from "./users.js"
import { deleteHash } from "./passwords.js"

async function modifyPassword(hash, data){
    const dataCopy = {...data}
    const deletedHash = await deleteHash({hash: hash})
    return restorePassword(deletedHash.email, {password: dataCopy.password})
}

export {
    modifyPassword
}