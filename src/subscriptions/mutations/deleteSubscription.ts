import { resolver } from "@blitzjs/rpc";
import db from "db"
import { z } from "zod"

const DeleteSubscription = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteSubscription),
  resolver.authorize(),
  async ({ id }) => {
    const subscription = await db.userSubscription.deleteMany({ where: { id } })
    return subscription
  }
)
