import yup from 'yup'

const pushCommentSchema = yup.object({
	name: yup.string()
	.min(1, "nombre debe contener un caracter como mínimo")
	.lowercase()
	.trim()
	.required("nombre es requerido"),

	email: yup.string()
	.email("email debe ser un formato adecuado")
	.matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

	.required("email es requerido"),

	comment: yup.string()
	.min(1, "comentario debe contener un caracter como mínimo")
	.required("comentario es requerido")
})

export {
    pushCommentSchema
}