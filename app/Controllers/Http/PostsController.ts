import Post from 'App/Models/Post'

export default class PostsController {

    public Post = new Post()

    public async index({ response }){
        await Post.all().then(data =>{
            response.send({
                msg: "Success",
                data: data
            })
        }).catch(err =>{
            response.send({
                msg: "error",
                err: err
            })
        })
    }

    public async store({ request, response}){
        console.log(request.body().user_id);
        const data = request.body()
        try {
            await Post.create(data).then(data =>{
                response.send( {
                    msg: "success",
                    data: data
                })
            })
        } catch (error) {  
        } 
    }

    public async show({ params, response }){
        const id = params.id
        try{
            await Post.find(id).then(data =>{
                response.send({
                    msg:"Success",
                    data: data
                })
            })
        }catch(err){
            response.send({
                msg: "err",
                err:err
            })
        }
    }

    public async update({ params, request, response }){
        const post = await Post.findOrFail(params.id)
        const newData = request.body()
        try {
            await post.merge(newData).save()
            response.send({
                msg: "success",
                data: newData
            })
        } catch (error) {
            response.send({
                msg: "err",
                err: error
            })
        }
    }

    public async destroy({ params, response }){
        const post = await Post.findOrFail(params.id)
        try {
            await post.delete()
            response.send({
                msg: "success",
            })
        } catch (error) {
            response.send({
                msg: "error",
                err: error
            })
        }
    }
}
