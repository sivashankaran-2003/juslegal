import db, { Prisma } from "db"
import { Ctx } from "blitz"

export default async function getTemplateID(
  input: {
    select?: Prisma.TemplateSelect | null | undefined
    include?: Prisma.TemplateInclude | null | undefined
    rejectOnNotFound?: Prisma.RejectOnNotFound | undefined
    where: Prisma.TemplateWhereUniqueInput
  },
  ctx: Ctx
) {
  ctx.session.$authorize()
  console.log(input)
  //Find the template with the given id
  const template = await db.template.findUnique(input)
  console.log("template", template)
  return template
}
