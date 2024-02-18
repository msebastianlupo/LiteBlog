import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TextInput from './forms/TextInput.jsx'
import EmailInput from './forms/EmailInput.jsx'
import Textarea from './forms/Textarea.jsx'
import Submit from './forms/Submit.jsx'

function CommentNew(){
    const [message, setMessage] = useState([])
    const [hasComment, setHasComment] = useState(false)
    const {postId} = useParams()

    const checkForm = (e) => {
        const elements = e.target.elements
        for(let element of elements){
            if(!element.checkValidity()){
                return false
            }
        }
        return true
    }

    const formConvert = (form) => {
        const formData = new FormData(form)
        return Object.fromEntries(formData)
    }

    const createComment = (e) => {
        e.preventDefault()
        if(checkForm(e)){
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formConvert(e.target))
            }
    
            fetch(`http://localhost:2023/posts/${postId}/comments`, options)
            .then(res => {
                if(res.status === 201){
                    setMessage("¡Gracias por tu comentario!")
                    setHasComment(true)
                }
                else{
                    setMessage("Hay errores en el formulario")
                }
            })
            .catch(err => setMessage(err.error))
        }
    }

    return(
        <>

            {
                !hasComment ?
                    <>
                        <h2 className="adj-c mar-t-10">Dejá tu comentario</h2>
                        <p className="mar-t-4 adj-c tex-2">{message}</p>
                        <form className="chidis-f chidir-c mar-t-2 chimar-t-2 neu-1 pad-2 rad-1" onSubmit={createComment}>
                            <TextInput label="Ingresá tu nombre" name="name" min="1" required={true} value="" />
                            <EmailInput label="Ingresá tu email" name="email" value="" />
                            <Textarea label="Tu comentario" name="comment" required={true} value="" />
                            <Submit text="Comentar" />
                        </form>
                    </>
                : <h2 className="adj-c mar-t-8 mar-b-4">{message}</h2>
            }
        </>
    )
}

export default CommentNew