import Application from '@ioc:Adonis/Core/Application'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.post("register", "AuthController.register")
Route.post("login", "AuthController.login")
Route.post("/logout", "AuthController.logout")

Route.group(() =>{
  Route.resource("Post", "PostsController").apiOnly()
  Route.resource("user", "UsersController").apiOnly()
}).middleware("auth:api")

Route.post("image", async ({ request }) =>{
  const image = request.files('images')
  if(image){
    await image[0].move(Application.tmpPath('uploads'))
    return{
      msg:"success"
    }
  }
})