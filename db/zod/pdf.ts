import * as z from "zod"
import { CompleteTemplate, RelatedTemplateModel, CompleteSubtemplate, RelatedSubtemplateModel, CompleteUser, RelatedUserModel } from "./index"

export const PDFModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  templateId: z.string().nullish(),
  subtemplateId: z.string().nullish(),
  name: z.string(),
  content: z.string(),
  userId: z.string(),
})

export interface CompletePDF extends z.infer<typeof PDFModel> {
  template?: CompleteTemplate | null
  subtemplate?: CompleteSubtemplate | null
  user: CompleteUser
}

/**
 * RelatedPDFModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPDFModel: z.ZodSchema<CompletePDF> = z.lazy(() => PDFModel.extend({
  template: RelatedTemplateModel.nullish(),
  subtemplate: RelatedSubtemplateModel.nullish(),
  user: RelatedUserModel,
}))
