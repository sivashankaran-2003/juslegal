import { resolver } from "@blitzjs/rpc";
import db from "db"
import { z } from "zod"

const UpdateSubscription = z.object({
  subscriptionId: z.string(),
  status: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSubscription),
  resolver.authorize(),
  async ({ subscriptionId, ...data }) => {
    const subscription = await db.userSubscription.update({ where: { subscriptionId }, data })
    return subscription
  }
)
