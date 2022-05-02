import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sales from 'App/Models/Sale'

export default class SalesController {

    public async index(){
        const sale = await Sales.all()

        return{
            data: sale
        }
    }


    public async store({params}: HttpContextContract) {


        const sale = await Sales.create(params.id)

        return {
            Message: "Client successfuly Created!",
            data: sale,
        }

    }
}
