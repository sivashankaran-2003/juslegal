import Razorpay from "razorpay"
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils"
import db from "db"

export default async function handler(req, res) {
  if (req.method == "POST") {
    // Initialize razorpay object
    const webhookBody = req.body
    const webhookSignature = req.headers["x-razorpay-signature"]
    const webhookSecret = process.env.RAZORPAY_WEBHOOKSECRET as string
    console.log(webhookBody)
    const verified = validateWebhookSignature(
      JSON.stringify(webhookBody),
      webhookSignature,
      webhookSecret
    )
    console.log(verified)
    if (verified) {
      const subscriptionId = webhookBody.payload.subscription.entity.id
      const status = webhookBody.payload.subscription.entity.status
      const planId = webhookBody.payload.subscription.entity.plan_id
      const customerId = webhookBody.payload.subscription.entity.customer_id
      const event = webhookBody.event
      const end = webhookBody.payload.subscription.entity.current_end
      console.log(end)
      //convert end to date
      const current_end = new Date(end * 1000)
      const total_end = new Date(webhookBody.payload.subscription.entity.end_at * 1000)
      console.log(subscriptionId, status, planId, customerId, event)
      await db.userSubscription.update({
        where: { subscriptionId },
        data: { status, current_end, end_at: total_end },
      })
    }
    res.status(200).json({
      message: "Webhook received",
    })
  } else {
    res.status(400).json({
      error: "Bad Request",
    })
  }
}
