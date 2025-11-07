import { resolver } from "@blitzjs/rpc";
import db from "db"
import { z } from "zod"

const DeleteSubtemplate = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteSubtemplate),
  resolver.authorize("ADMIN"),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subtemplate = await db.subtemplate.deleteMany({ where: { id } })

    return subtemplate
  }
)
