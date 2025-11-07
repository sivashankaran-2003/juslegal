import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const UserSubscriptionModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  customerId: z.string().nullish(),
  subscriptionId: z.string(),
  planId: z.string(),
  status: z.string(),
  current_end: z.date().nullish(),
  end_at: z.date().nullish(),
})

export interface CompleteUserSubscription extends z.infer<typeof UserSubscriptionModel> {
  user: CompleteUser
}

/**
 * RelatedUserSubscriptionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserSubscriptionModel: z.ZodSchema<CompleteUserSubscription> = z.lazy(() => UserSubscriptionModel.extend({
  user: RelatedUserModel,
}))
