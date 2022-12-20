import User from 'App/Models/User'
import Post from 'App/Models/Post'

export default class UsersController {
    public user = new User()
    public Post = new Post()

    public async show({ params, response }){
        const id = params.id
        const user = await User.findOrFail(id)
        try{
            
            const post = await user.related('posts').query()
                response.send({
                    msg:"Success",
                    data: user, post
                })
        }catch(err){
            response.send({
                msg: "err",
                err:err
            })
        }
    }

    public async store({ request, response}){
        const data = request.body()
        try {
            await User.create(data).then(data =>{
                response.send( {
                    msg: "success",
                    data: data
                })
            })
        } catch (error) {
            
        }
       
    }
}
