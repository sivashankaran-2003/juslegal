import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { generatePlaceholder } from "src/admin/utils/generatePlaceholder"

const UpdateSubtemplate = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  total: z.string().min(1),
  content: z.string(),
  inputFields: z.any(),
  templateId: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSubtemplate),
  resolver.authorize("ADMIN"),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subtemplate = await db.subtemplate.update({
      where: { id },
      data: {
        ...data,
        //@ts-ignore
        placeholder: generatePlaceholder(data.content),
      },
    })

    return subtemplate
  }
)
