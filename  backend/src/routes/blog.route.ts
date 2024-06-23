import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'
export const blog=new Hono<{
	Bindings:{
		DATABASE_URL:string,
		JWT_SECRET:string
	},
	Variables:{
		prisma:any
	}
}>();

blog.use('*', async (c, next) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate())
	c.set('prisma',prisma)

	if (!c.env.DATABASE_URL || !c.env.JWT_SECRET) {
	  return c.json({ error: 'Environment variables are not set correctly' }, 500);
	}
	await next();
  });
  blog.use('/*', async (c, next) => {
	const header=c.req.header("Authorization") || ""
	if(!header){
		c.status(403)
		return c.json({
			"Auth":"No auth "
		})

	}
	const token=header.split(" ")[1]
	console.log("Tokem",token)
	const response = await verify(token,c.env.JWT_SECRET)
	console.log(response,"Resposne")
	if(!response){
		c.status(404)
		return c.json({
			"error":"Unautorised"
		})
	}
	await next()
  })

  blog.get('/:id', async (c) => {
   const id = c.req.param('id')
	const prisma =c.get('prisma')
	const posts=await prisma.posts.findMany(
		{
			where:{
				authorId:id
			}
		}
	)
 	return c.json({"posts":posts})
})

blog.post('/', async (c) => {
	
    const prisma=c.get('prisma')
	console.log("Resposne")
	const body = await c.req.json()
	const post=await prisma.posts.create({
		data:{
			title:body.title,
			content:body.content,
			published:body.published,
			authorId:body.authorId
		}
	})
	return c.json({
		"Post created":post
	})
})

blog.put('/', async (c) => {
	const prisma=c.get('prisma')
	const body=await c.req.json()
	const post=await prisma.posts
	
	return c.text('signin route')
})


