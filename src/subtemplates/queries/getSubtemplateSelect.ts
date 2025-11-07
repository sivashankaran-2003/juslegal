import db, { Prisma } from "db"
import { Ctx } from "blitz"

export default async function getSubtemplateSelect(
  input: { select?: Prisma.SubtemplateSelect | null | undefined; include?: Prisma.SubtemplateInclude | null | undefined; rejectOnNotFound?: Prisma.RejectOnNotFound | undefined; where: Prisma.SubtemplateWhereUniqueInput },
  ctx: Ctx
) {
  ctx.session.$authorize()
  //Find the template with the given id
  const template = await db.subtemplate.findUnique(input)
  return template
}
