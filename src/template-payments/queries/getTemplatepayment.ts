import { resolver } from "@blitzjs/rpc";
import { Ctx } from "blitz";
import db from "db"
import { z } from "zod"

const GetTemplatepayment = z.object({
  id: z.optional(z.string()),
  subtemplateId: z.optional(z.string()),
})

export default resolver.pipe(
  resolver.zod(GetTemplatepayment),
  resolver.authorize(),
  async ({ id, subtemplateId }, ctx: Ctx) => {
    if (id) {
      const templatepayment = await db.templatePayment.findFirst({
        where: {
          templateId: id,
          //@ts-ignore
          userId: ctx.session.userId,
          status: "success",
        },
      })
      return templatepayment
    }
    if (subtemplateId) {
      const templatepayment = await db.templatePayment.findFirst({
        where: {
          subtemplateId,
          //@ts-ignore
          userId: ctx.session.userId,
          status: "success",
        },
      })
      return templatepayment
    }
  }
)
