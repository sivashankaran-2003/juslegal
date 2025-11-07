import { resolver } from "@blitzjs/rpc";
import { NotFoundError } from "blitz";
import db from "db"
import { z } from "zod"

const GetSubtemplate = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetSubtemplate), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const subtemplate = await db.subtemplate.findFirst({ where: { id } })

  if (!subtemplate) throw new NotFoundError()

  return subtemplate
})
