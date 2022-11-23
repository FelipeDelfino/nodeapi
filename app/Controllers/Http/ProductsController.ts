import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Product from 'App/Models/Product'


export default class ProductsController {

    public async index() {

        const product = await Product.all()

        return {
            data: product.sort(),
        }

    }

    public async store({ request }: HttpContextContract) {

        // const body = request.body()

        // const product = await Product.create(body)
        const productSchema = schema.create({
            title: schema.string([rules.minLength(3), rules.maxLength(50)]),
            author: schema.string([rules.minLength(3), rules.maxLength(50)]),
            pagnumber: schema.number(),
            price: schema.number(),
            deleted: schema.boolean()
        })
        const productValidate = await request.validate({ schema: productSchema });
        await Product.create(productValidate)

        return {
            Message: "Product successfully Created!",
            data: productValidate,
        }

    }

    // public async show({ params }: HttpContextContract) {

    //     const product = await Product.findOrFail(params.id)


    //     const del = product.deleted


    //     if (del === false) {
    //         return product
    //     } else {

    //         return "This product has been deleted"
    //     }
    // }

    public async update({ params, request }: HttpContextContract) {

        const body = request.body()

        const product = await Product.findOrFail(params.id)

        product.title = body.title
        product.author = body.author
        product.pagnumber = body.pagnumber
        product.price = body.price
        product.deleted = body.deleted

        await product.save()

        return {
            message: "Product successfully Update!",
            data: product
        }
    }

    public async destroy({ params }: HttpContextContract) {

        const product = await Product.findOrFail(params.id)

        product.deleted = true

        await product.save()

        return {
            message: "Client successfully Deleted!",
            data: product
        }
    }
}
