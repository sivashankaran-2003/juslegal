import { resolver } from "@blitzjs/rpc";
import { paginate } from "blitz";
import db, { Prisma } from "db"
interface GetProjectsInput
  extends Pick<
    // @ts-ignore
    Prisma.ProjectFindManyArgs,
    "where" | "orderBy" | "skip" | "take" | "select"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, select, skip = 0, take = 100 }: GetProjectsInput) => {
    const {
      items: Templates,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.template.count({ where }),
      query: (paginateArgs) => db.template.findMany({ ...paginateArgs, where, orderBy, select }),
    })
    console.log("Templates", Templates)
    return {
      Templates,
      nextPage,
      hasMore,
      count,
    }
  }
)
