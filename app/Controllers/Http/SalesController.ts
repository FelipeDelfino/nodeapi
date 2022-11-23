import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Sales from 'App/Models/Sale'

export default class SalesController {

    public async index(){
        const sale = await Sales.all()

        return{
            data: sale
        }
    }


    public async store({request}: HttpContextContract) {

        const saleSchema = schema.create({
            quantity: schema.number(),
            priceunit: schema.number(),
            totalprice: schema.number(),
            clientId: schema.number(),
            productId: schema.number(),
        })
        const salesValidate = await request.validate({ schema: saleSchema });
        await Sales.create(salesValidate)

        return {
            Message: "Sell successfuly!",
            data: salesValidate,
        }

    }


    public async show({ params }: HttpContextContract) {

        const sale = await Sales.findOrFail(params.id)

        return {
            data: sale,
        }
    }
}
