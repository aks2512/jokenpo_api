import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'
import { scoreRoutes } from './routes/score'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'jokenpo',
})

app.register(authRoutes)
app.register(scoreRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`HTTP server running on http://localhost:3333`)
  })
