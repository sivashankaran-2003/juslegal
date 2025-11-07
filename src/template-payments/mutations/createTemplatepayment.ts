import { resolver } from "@blitzjs/rpc";
import db from "db"
import { z } from "zod"

const CreateTemplatepayment = z.object({
  id: z.string(),
  templateId: z.optional(z.string()),
  subtemplateId: z.optional(z.string()),
  status: z.string(),
  amount: z.number(),
  currency: z.string(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateTemplatepayment),
  resolver.authorize(),
  async (input) => {
    if (input.templateId) {
      const templatepayment = await db.templatePayment.create({
        data: {
          template: { connect: { id: input.templateId } },
          status: input.status,
          amount: input.amount,
          currency: input.currency,
          //@ts-ignore
          razorpayOrderId: input.razorpayOrderId,
          razorpayPaymentId: input.razorpayPaymentId,
          razorpaySignature: input.razorpaySignature,
          user: { connect: { id: input.id } },
        },
      })
      return templatepayment
    }
    if (input.subtemplateId) {
      const templatepayment = await db.templatePayment.create({
        data: {
          //@ts-ignore
          subtemplate: { connect: { id: input.subtemplateId } },
          status: input.status,
          amount: input.amount,
          currency: input.currency,
          //@ts-ignore
          razorpayOrderId: input.razorpayOrderId,
          razorpayPaymentId: input.razorpayPaymentId,
          razorpaySignature: input.razorpaySignature,
          user: { connect: { id: input.id } },
        },
      })
      return templatepayment
    }
  }
)
