import { resolver } from "@blitzjs/rpc";
import { paginate } from "blitz";
import db, { Prisma } from "db"

interface GetSubtemplatesInput
  extends Pick<Prisma.SubtemplateFindManyArgs, "where" | "orderBy" | "skip" | "take" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 10, select }: GetSubtemplatesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: subtemplates,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.subtemplate.count({ where }),
      query: (paginateArgs) => db.subtemplate.findMany({ ...paginateArgs, where, orderBy, select }),

    })

    return {
      subtemplates,
      nextPage,
      hasMore,
      count,
    }
  }
)
