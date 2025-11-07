import { resolver } from "@blitzjs/rpc";
import db from "db"

export default resolver.pipe(resolver.authorize(), async (input, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const user = await db.user.findUnique({
    where: { id: ctx.session.userId },
  })
  const subscription = await db.userSubscription.findMany({
    where: { userId: user?.id as string },
  })
  // get the last subscription
  const lastSubscription = subscription[subscription.length - 1]

  return lastSubscription
})
