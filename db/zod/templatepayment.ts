import * as z from "zod"
import { CompleteTemplate, RelatedTemplateModel, CompleteSubtemplate, RelatedSubtemplateModel, CompleteUser, RelatedUserModel } from "./index"

export const TemplatePaymentModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  templateId: z.string().nullish(),
  subtemplateId: z.string().nullish(),
  status: z.string(),
  userId: z.string(),
  amount: z.bigint(),
  currency: z.string(),
  razorpayOrderId: z.string().nullish(),
  razorpayPaymentId: z.string().nullish(),
  razorpaySignature: z.string().nullish(),
})

export interface CompleteTemplatePayment extends z.infer<typeof TemplatePaymentModel> {
  template?: CompleteTemplate | null
  subtemplate?: CompleteSubtemplate | null
  user: CompleteUser
}

/**
 * RelatedTemplatePaymentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTemplatePaymentModel: z.ZodSchema<CompleteTemplatePayment> = z.lazy(() => TemplatePaymentModel.extend({
  template: RelatedTemplateModel.nullish(),
  subtemplate: RelatedSubtemplateModel.nullish(),
  user: RelatedUserModel,
}))
