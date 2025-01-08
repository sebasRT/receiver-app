import {z} from 'zod'
export const newProductSchema = z.object({
    name: z.string({required_error: "Requerido"}).min(1, {message: 'Requerido'}),
    brand: z.string({required_error: "Requerido"}).min(1, {message: 'Requerido'}),
    costPrice: z.string({required_error: "Requerido"}).min(1, {message: 'Requerido'}),
    measure: z.string({required_error: "Requerido"}).min(1, {message: 'Requerido'}),
})

export type NewProduct = z.infer<typeof newProductSchema>