import { resolver } from "@blitzjs/rpc";
import db from "db"
import { z } from "zod"

const CreateSubscription = z.object({
  subscriptionId: z.string(),
  planId: z.string(),
  status: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateSubscription),
  resolver.authorize(),
  async (input, ctx) => {
    const subscription = await db.userSubscription.create({
      data: {
        ...input,
        user: {
          connect: {
            id: ctx.session.userId as string
          },
        },
      },
    })

    return subscription
  }
)
