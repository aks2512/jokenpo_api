import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function scoreRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/score', async (request, reply) => {
    const paramsSchema = z.object({
      sub: z.string().uuid(),
    })

    const { sub } = paramsSchema.parse(request.user)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: sub,
      },
    })

    return {
      score: user.score,
    }
  })

  app.post('/score', async (request, reply) => {
    const paramsSchema = z.object({
      sub: z.string().uuid(),
    })

    const { sub } = paramsSchema.parse(request.user)

    let user = await prisma.user.findUniqueOrThrow({
      where: {
        id: sub,
      },
    })

    if (user.id !== sub) {
      return reply.status(401).send()
    }

    user = await prisma.user.update({
      where: {
        id: sub,
      },
      data: {
        score: user.score + 1,
      },
    })

    return {
      score: user.score,
    }
  })
}
