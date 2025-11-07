import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeletCategory = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeletCategory),
  resolver.authorize("ADMIN"),
  async ({ name }) => {
    //find the category id
    const categoryId = await db.category.findUnique({ where: { name } })
    //find all templates with the category name
    const templates = await db.template.findMany({
      //@ts-ignore
      where: { categoryIds: { has: categoryId?.id } },
    })
    //set the category to null
    templates.forEach(async (template) => {
      await db.template.update({
        where: { id: template.id },
        //@ts-ignore
        data: { categoryIds: template.categoryIds.filter((id) => id !== categoryId?.id) },
      })
    })

    const category = await db.category.deleteMany({ where: { name } })

    return category
  }
)
