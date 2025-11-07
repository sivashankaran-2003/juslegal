import db from "db"
import * as z from "zod"
import { Ctx } from "blitz"
import { generatePlaceholder } from "src/admin/utils/generatePlaceholder"

// Create a template that takes the input from the user and creates a new template
// inputs given as name, description, JSON string of the template

const CreateTemplate = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  total: z.string().min(1),
  content: z.string(),
  visibility: z.string(),
  categories: z.array(z.any()),
  inputFields: z.string(),
})

type CreateTemplateInput = z.infer<typeof CreateTemplate>

export default async function createTemplate(input: CreateTemplateInput, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")
  // console.log(input);
  const { name, description, content, total, inputFields, visibility, categories } =
    CreateTemplate.parse(input)
  const template = await db.template.create({
    data: {
      name: name,
      description: description,
      content: content,
      total: total,
      inputFields: inputFields,
      visibility: visibility,
      //@ts-ignore
      placeholder: generatePlaceholder(content),
      user: {
        connect: {
          id: ctx.session.userId,
        },
      },
      Category: {
        //@ts-ignore
        connect: categories.map((category) => {
          return {
            name: category.name,
          }
        })
      },
    },
  })
  return template
}
