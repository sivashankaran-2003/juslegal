import { resolver } from "@blitzjs/rpc";
import { paginate } from "blitz";
import db, { Prisma } from "db"

interface GetSubscriptionsInput
  extends Pick<Prisma.UserSubscriptionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSubscriptionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: subscriptions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.userSubscription.count({ where }),
      query: (paginateArgs) => db.userSubscription.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      subscriptions,
      nextPage,
      hasMore,
      count,
    }
  }
)
