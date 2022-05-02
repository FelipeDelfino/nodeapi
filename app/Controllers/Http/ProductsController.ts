import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'


export default class ProductsController {

    public async index() {

       const product = await Product.all()

       return{
           data: product.sort(),
       }

    }

    public async store({ request }: HttpContextContract) {

        const body = request.body()

        const product = await Product.create(body)


        return {
            Message: "Client successfully Created!",
            data: product,
        }

    }

    public async show({ params }: HttpContextContract) {

        const product = await Product.findOrFail(params.id)
        
        
        const del = product.deleted


        if (del == false) {
            return product
        } else {

            return "This product has been deleted"
        }
    }

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
