import db from "db"
import * as z from "zod"
import { Ctx } from "blitz"
import { generatePlaceholder } from "../utils/generatePlaceholder"
import { te } from "date-fns/locale"

const UpdateTemplate = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  total: z.optional(z.string()),
  content: z.string(),
  visibility: z.string(),
  categories: z.optional(z.array(z.any())),
  inputFields: z.string(),
  savedData: z.optional(z.any()),
  categoryId: z.optional(z.string()),
})

type UpdateTemplateInput = z.infer<typeof UpdateTemplate>

export default async function updateTemplate(input: UpdateTemplateInput, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")

  const data = UpdateTemplate.parse(input)
  const template = await db.template.findUnique({
    where: {
      id: data.id,
    },
  })

  const categoryIds = await db.category.findMany({
    where: {
      name: {
        in: data.categories?.map((category) => {
          return category.name
        }),
      },
    },
    select: {
      id: true,
    },
  })

  if (!template) throw new Error("Template not found")

  function jsonConcat(o1, o2) {
    for (var key in o2) {
      o1[key] = o2[key]
    }
    return o1
  }

  console.log(data.categories)

  const template_ = await db.template.findUnique({
    where: {
      id: data.id,
    },
  })

  let _categoryIds:string[] = []

  if (data.categories) {
    // find the difference between the two arrays
    console.log("categoryIds", categoryIds)
    const catIds = categoryIds.map((x) => x.id)
    //@ts-ignore
    const templateCat = template_.categoryIds.map((x) => x)
    console.log("template_.categoryIds", templateCat)
    const difference1 = templateCat.filter((x) => !catIds.includes(x))
    _categoryIds = difference1
  }

  console.log("categoryIds", _categoryIds)

  const templates = await db.template.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      description: data.description,
      content: data.content,
      total: data.total,
      savedData: template.savedData
        ? JSON.stringify(jsonConcat(JSON.parse(template.savedData), JSON.parse(data.savedData)))
        : data.savedData,
      inputFields: data.inputFields,
      //@ts-ignore
      placeholder: generatePlaceholder(data.content),
      visibility: data.visibility,

      Category: {
        //@ts-ignore
        connect: categoryIds.map((category) => {
          return {
            id: category.id,
          }
        }),
        //@ts-ignore
        disconnect: _categoryIds.map((category) => {
          return {
            id: category,
          }
        }),
      },
      userId: ctx.session.userId,
    },
  })

  return templates
}
