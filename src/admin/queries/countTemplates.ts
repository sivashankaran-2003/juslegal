import db from "db"
import { Ctx } from "blitz"

export default async function countTemplates(input, ctx: Ctx) {
  ctx.session.$authorize()
  if (input.where.visibility === "ADMIN") {
    const templates = await db.template.count()
    return templates
  } 
  //check if where.visibility.in contains ADMIN
  if (input.where.visibility.in.includes("ADMIN")) {
    const templates = await db.template.count()
    return templates
  }
  else {
    const templates = await db.template.count(input)
    return templates
  }
}
