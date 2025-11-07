import { resolver } from "@blitzjs/rpc";
import { paginate } from "blitz";
import db, { Prisma } from "db"

interface GetTemplatepaymentsInput
  //@ts-ignore
  extends Pick<Prisma.TemplatepaymentFindManyArgs, "where" | "orderBy" | "skip" | "take" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100, select }: GetTemplatepaymentsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: templatepayments,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.templatePayment.count({ where }),
      query: (paginateArgs) => db.templatePayment.findMany({ ...paginateArgs, where, orderBy, select }),
    })

    return {
      templatepayments,
      nextPage,
      hasMore,
      count,
    }
  }
)
