import yup from 'yup'

const createPostSchema = yup.object({
	title: yup.string()
	.min(1, "título debe contener un caracter como mínimo")
	.lowercase()
	.trim()
	.required(),

	category: yup.string()
	.min(3, "categoría debe contener un caracter como mínimo")
	.max(20, "categoria debe contener 20 caracteres como máximo")
	.lowercase()
	.trim()
	.required(),

	text: yup.string()
	.min(1, "texto debe contener un caracter como mínimo")
	.required()
})

const modifyPostSchema = yup.object({
	title: yup.string()
	.min(1, "título debe contener un caracter como mínimo")
	.lowercase()
	.trim(),

	category: yup.string()
	.min(3, "categoría debe contener un caracter como mínimo")
	.max(20, "categoria debe contener 20 caracteres como máximo")
	.lowercase()
	.trim(),

	text: yup.string()
	.min(1, "texto debe contener un caracter como mínimo")
})

export {
    createPostSchema,
	modifyPostSchema
}