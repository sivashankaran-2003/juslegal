import * as z from "zod"
import { CompleteTemplate, RelatedTemplateModel, CompleteTemplatePayment, RelatedTemplatePaymentModel, CompletePDF, RelatedPDFModel } from "./index"

export const SubtemplateModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  description: z.string(),
  total: z.string(),
  content: z.string(),
  placeholder: z.string().nullish(),
  inputFields: z.string(),
  templateId: z.string(),
})

export interface CompleteSubtemplate extends z.infer<typeof SubtemplateModel> {
  template: CompleteTemplate
  TemplatePayment: CompleteTemplatePayment[]
  PDF: CompletePDF[]
}

/**
 * RelatedSubtemplateModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSubtemplateModel: z.ZodSchema<CompleteSubtemplate> = z.lazy(() => SubtemplateModel.extend({
  template: RelatedTemplateModel,
  TemplatePayment: RelatedTemplatePaymentModel.array(),
  PDF: RelatedPDFModel.array(),
}))
