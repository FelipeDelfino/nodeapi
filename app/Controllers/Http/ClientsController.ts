import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

export default class ClientsController {

    public async store({ request }: HttpContextContract) {

        const body = request.body()

        const client = await Client.create(body)

        return {
            Message: "Client successfuly Created!",
            data: client,
        }

    }


    public async index() {

        const clients = await Client.all()

        return {
            data: clients,
        }
    }

    public async show({ params }: HttpContextContract) {

        const client = await Client.findOrFail(params.id)

        return {
            data: client,
        }
    }

    public async update({ params, request }: HttpContextContract) {

        const body = request.body()

        const client = await Client.findOrFail(params.id)

        client.name = body.name
        client.cpf = body.cpf

        await client.save()

        return {
            message: "Client successfully Update!",
            data: client
        }
    }

    public async destroy({ params }: HttpContextContract) {

        const client = await Client.findOrFail(params.id)

        await client.delete()

        return {
            message: "Client successfully Deleted!",
            data: client
        }
    }
}


