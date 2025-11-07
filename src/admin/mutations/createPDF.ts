import db from "db"
import * as z from "zod"
import { Ctx } from "blitz"

const createPDF = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  templateName: z.string(),
  content: z.string(),
  subtemplate: z.boolean(),
})

type CreatePDFInput = z.infer<typeof createPDF>

export default async function createPDFMutation(input: CreatePDFInput, ctx: Ctx) {
  ctx.session.$authorize()
  const data = createPDF.parse(input)
  if (ctx.session.role === "USER") {
    await db.templatePayment.updateMany({
      where: {
        OR: [
          {
            templateId: data.id,
          },
          {
            //@ts-ignore
            subtemplateId: data.id,
          },
        ],
      },
      data: {
        status: "done",
      },
    })
  }
  if (!data.subtemplate) {
    const pdf = await db.pDF.create({
      data: {
        name: data.name,
        template: {
          connect: {
            id: data.id,
          },
        },
        content: data.content,
        user: {
          connect: {
            id: ctx.session.userId,
          },
        },
      },
    })
    return pdf
  }
  if (data.subtemplate) {
    const pdf = await db.pDF.create({
      data: {
        name: data.name,
        //@ts-ignore
        subtemplate:{
          connect: {
            id: data.id,
          },
        },
        content: data.content,
        user: {
          connect: {
            id: ctx.session.userId,
          },
        },
      },
    })
    return pdf
  }
}
