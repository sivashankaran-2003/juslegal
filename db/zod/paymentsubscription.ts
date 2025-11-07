import * as z from "zod"
import { CompleteUserSubscription, RelatedUserSubscriptionModel } from "./index"

export const PaymentSubscriptionModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userSubscriptionId: z.string(),
  lastPaymentDate: z.date(),
  nextPaymentDate: z.date(),
  razorpayOrderId: z.string().nullish(),
  razorpayPaymentId: z.string().nullish(),
  razorpaySignature: z.string().nullish(),
})

export interface CompletePaymentSubscription extends z.infer<typeof PaymentSubscriptionModel> {
  userSubscription: CompleteUserSubscription
}

/**
 * RelatedPaymentSubscriptionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPaymentSubscriptionModel: z.ZodSchema<CompletePaymentSubscription> = z.lazy(() => PaymentSubscriptionModel.extend({
  userSubscription: RelatedUserSubscriptionModel,
}))
