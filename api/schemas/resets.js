import yup from 'yup'

const modifyPasswordSchema = yup.object({
	password: yup.string()
	.min(8, "password debe contener 8 caracteres como mínimo")
	.max(60, "password debe contener 60 caracteres como máximo")
	.required("password es requerido")
})

export {
    modifyPasswordSchema
}