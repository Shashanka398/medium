import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import {  sign } from 'hono/jwt'
import { signUpInput } from 'medium-common-shash';
export const user=new Hono<{
	Bindings:{
		DATABASE_URL:string,
		JWT_SECRET:string
	},
	Variables:{
		prisma:any
	}
}>();




user.use('*', async (c, next) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate())
	c.set('prisma',prisma)
	await next();
  });

user.get("/",async (c)=>{
    const prisma =c.get('prisma')
    const users=await prisma.user.findMany()
    return c.json(users)
 })

 user.post('/signup', async (c) => {

   const prisma=c.get('prisma')
   const body = await c.req.json()
   const {success}=signUpInput.safeParse(body)
   if(!success){
    c.status(401)
    return c.json({
        message:"Inputs not correct"
    })

   }
   const user = await prisma.user.create({
       data: {
           email: body.email,
           name:body.name,
           password: body.password,

       }
   })
   const token = await sign({ id: user.id }, c.env?.JWT_SECRET)

   return c.json({
       status:200,
       jwt: token
   })
}
)

user.post('/signin', async (c) => {
    console.log('Signin endpoint hit');
   const prisma=c.get('prisma')
   const body = await c.req.json()
   const user=await prisma.user.findUnique(
       {
           where:{
               email:body.email
           }
       }
   
   )
   if(!user){
       c.status(403)
     return c.json({
           error: "User not found"
       })
   }
   const token= await sign({id:user.id},c.env?.JWT_SECRET)
   

   return c.json({
       jwt:token
   })
})


