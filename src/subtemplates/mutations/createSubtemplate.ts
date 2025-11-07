import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { generatePlaceholder } from "src/admin/utils/generatePlaceholder"

const CreateSubtemplate = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  total: z.string().min(1),
  content: z.string(),
  inputFields: z.any(),
  templateId: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateSubtemplate),
  resolver.authorize("ADMIN"),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subtemplate = await db.subtemplate.create({
      //@ts-ignore
      data: {
        ...input,
        //@ts-ignore
        placeholder: generatePlaceholder(input.content),
      },
    })

    return subtemplate
  }
)
