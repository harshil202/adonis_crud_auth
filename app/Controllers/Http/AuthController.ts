import User from 'App/Models/User'

export default class AuthController {
    public async login({ request, auth, response }){

        try {
            const email = request.body().email
            const password = request.body().password
            const token = await auth.use("api").attempt(email, password, {
                expiresIn: "10 days"
            })
            response.send({
                msg: "Logged In",
                token: token
            })
        } catch (error) {
            response.send({
                msg: "error",
                error: error
            })
        }
    }

    public async register({ request, auth, response }){
        const data = request.body()
        const user = new User()
        user.name = data.name
        user.password = data.password
        user.email = data.email
        try {
            await user.save()
            const token = await auth.use("api").login(user, {
            expiresIn: "10 days"
        })
        return token.toJSON()
        } catch (error) {
            response.send({
                msg: "error",
                error: error
            })
        }
    }

    public async logout({ auth }){
        await auth.use('api').revoke()
        return{
            msg: "User Logged out",
            revoked: true
        }
    }

}
