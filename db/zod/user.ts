import * as z from "zod"
import { CompleteToken, RelatedTokenModel, CompleteSession, RelatedSessionModel, CompleteTemplate, RelatedTemplateModel, CompletePDF, RelatedPDFModel, CompleteTemplatePayment, RelatedTemplatePaymentModel, CompleteUserSubscription, RelatedUserSubscriptionModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().nullish(),
  email: z.string(),
  hashedPassword: z.string().nullish(),
  role: z.string(),
  updatedRole: z.boolean(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  tokens: CompleteToken[]
  sessions: CompleteSession[]
  Template: CompleteTemplate[]
  PDF: CompletePDF[]
  TemplatePayment: CompleteTemplatePayment[]
  UserSubscription: CompleteUserSubscription[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  tokens: RelatedTokenModel.array(),
  sessions: RelatedSessionModel.array(),
  Template: RelatedTemplateModel.array(),
  PDF: RelatedPDFModel.array(),
  TemplatePayment: RelatedTemplatePaymentModel.array(),
  UserSubscription: RelatedUserSubscriptionModel.array(),
}))
