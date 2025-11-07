import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompletePDF, RelatedPDFModel, CompleteCategory, RelatedCategoryModel, CompleteSubtemplate, RelatedSubtemplateModel, CompleteTemplatePayment, RelatedTemplatePaymentModel } from "./index"

export const TemplateModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  description: z.string(),
  total: z.string(),
  content: z.string(),
  placeholder: z.string().nullish(),
  savedData: z.string().nullish(),
  inputFields: z.string(),
  visibility: z.string(),
  userId: z.string(),
  categoryId: z.string().nullish(),
})

export interface CompleteTemplate extends z.infer<typeof TemplateModel> {
  user: CompleteUser
  PDF: CompletePDF[]
  Category?: CompleteCategory | null
  Subtemplate: CompleteSubtemplate[]
  TemplatePayment: CompleteTemplatePayment[]
}

/**
 * RelatedTemplateModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTemplateModel: z.ZodSchema<CompleteTemplate> = z.lazy(() => TemplateModel.extend({
  user: RelatedUserModel,
  PDF: RelatedPDFModel.array(),
  Category: RelatedCategoryModel.nullish(),
  Subtemplate: RelatedSubtemplateModel.array(),
  TemplatePayment: RelatedTemplatePaymentModel.array(),
}))
