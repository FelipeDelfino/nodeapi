import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Client from 'App/Models/Client'

export default class ClientsController {

    public async store({ request }: HttpContextContract) {

        const clientSchema = schema.create({
            name: schema.string([rules.minLength(3), rules.maxLength(50)]),
            cpf: schema.number()
        })
        const clientValidate = await request.validate({ schema: clientSchema });
        await Client.create(clientValidate)

        return {
            Message: "Client successfuly Created!",
            data: clientValidate,
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

        const clientSchema = schema.create({
            name: schema.string([rules.minLength(3), rules.maxLength(50)]),
            cpf: schema.number()
        })
        const clientValidate = await request.validate({ schema: clientSchema });
        const client = await Client.findOrFail(params.id)

        client.name = clientValidate.name
        client.cpf = clientValidate.cpf

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


