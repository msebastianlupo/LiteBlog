import yup from 'yup'

const createUserSchema = yup.object({
	email: yup.string()
	.email("mail debe ser en formato adecuado")
	.matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
	.required("email es requerido"),

	password: yup.string()
	.min(8, "password debe contener 8 caracteres como mínimo")
	.max(60, "password debe contener 60 caracteres como máximo")
	.required("password es requerido"),

	role: yup.string()
	.oneOf(['admin', 'editor'])
})

const modifyUserSchema = yup.object({
	password: yup.string()
	.min(8, "password debe contener 8 caracteres como mínimo")
	.max(60, "password debe contener 60 caracteres como máximo"),

	role: yup.string()
	.oneOf(['admin', 'editor'])
})

export {
	createUserSchema,
	modifyUserSchema
}