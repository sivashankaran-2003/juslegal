import Razorpay from "razorpay"
import * as z from "zod"
import db from "db"
const cancelSub = z.object({
  subscriptionId: z.string(),
})

export default async function cancelSubscription(input, ctx) {
  ctx.session.$authorize()
  const { subscriptionId } = cancelSub.parse(input)
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEYID as string,
    key_secret: process.env.RAZORPAY_SECRET as string,
  })
  await razorpay.subscriptions.cancel(subscriptionId)
  return await db.userSubscription.update({
    where: { subscriptionId },
    data: { status: "cancelled" },
  })
}
