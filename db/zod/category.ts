import * as z from "zod"
import { CompleteTemplate, RelatedTemplateModel } from "./index"

export const CategoryModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
})

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  Template: CompleteTemplate[]
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryModel.extend({
  Template: RelatedTemplateModel.array(),
}))
