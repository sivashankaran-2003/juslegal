import db from "db"
import { Ctx } from "blitz"

export default async function getTemplates(input, ctx: Ctx) {
  ctx.session.$authorize()
  const templates = await db.template.findMany(input)
  console.log("templates", templates)
  return templates
}
