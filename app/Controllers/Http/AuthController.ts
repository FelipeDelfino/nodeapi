import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class AuthController {




    public async register({ request, response, auth }: HttpContextContract) {

        const userSchema = schema.create({
            username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username', caseInsensitive: true })]),
            email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'username', caseInsensitive: true })]),
            passwords: schema.string({}, [rules.minLength(8)])
        })
        const data = await request.validate({ schema: userSchema });

        const user = await User.create(data)

        await auth.login(user)

        return response.redirect('/api')

    }

    public async registerShow() {

        const user = await User.all()

        return {
            data: user,
        }
    }



    public async login({ request, response, auth }: HttpContextContract) {
        const { uid, password } = request.only(['uid', 'password'])

        try {
            await auth.attempt(uid, password)
        } catch (error) {
            return response.redirect('/')
        }
        return response.redirect('/api')

    }

    public async loginShow() {

        const user = await User.all()

        return {
            data: user,
        }
    }


}

