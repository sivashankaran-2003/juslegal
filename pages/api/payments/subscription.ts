//@ts-ignore
import Razorpay from "razorpay"

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEYID,
      key_secret: process.env.RAZORPAY_SECRET,
    })

    // Create an order -> generate the OrderID -> Send it to the Front-end
    try {
      const response = await razorpay.subscriptions.create({
        plan_id: process.env.plan_id,
        customer_notify: 1,
        quantity: 1,
        total_count: 6,
      })
      console.log(response)
      res.status(200).json({
        id: response.id,
        status: response.status,
        entity: response.entity,
        plan_id: response.plan_id,
        short_url: response.short_url,
      })
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  } else {
    // Handle any other HTTP method
  }
}
