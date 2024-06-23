import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { user } from './routes/user.route';
import { blog } from './routes/blog.route';
import { cors } from 'hono/cors';
// Create the main Hono app
const app = new Hono<{
	Bindings:{
		DATABASE_URL:string,
		JWT_SECRET:string
	},
	Variables:{
		prisma:any
	}
}>();
console.log("Logging")
app.use("/*", cors())
app.get("/api/v2/check",(c)=>{
return c.json({
	"Check":"Successs"
})
})
app.route("/api/v1/users",user)
app.route("/api/v1/blogs",blog)
export default app;