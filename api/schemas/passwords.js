import yup from 'yup'

const createPasswordSchema = yup.object({
	email: yup.string()
	.email("mail debe ser en formato adecuado")
	.matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
	.required("email es requerido")
})

export {
    createPasswordSchema
}