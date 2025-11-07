import { useMutation, useQuery } from "@blitzjs/rpc"
//@ts-nocheck
import { Button } from "@mantine/core"
import { makeSubsciptionPayment } from "src/razorpay"
import createSubscription from "src/subscriptions/mutations/createSubscription"
import getSubscription from "src/subscriptions/queries/getSubscription"
import cancelSubscription from "src/subscriptions/mutations/cancelSubscription"
import { showNotification } from "@mantine/notifications"

export default function SubscriptionPayments({ currentUser }) {
  const [createSubscriptionMutation] = useMutation(createSubscription)
  const [cancelSubscriptionMutation] = useMutation(cancelSubscription)
  const [subscription] = useQuery(getSubscription, {},{suspense: false})
  return (
    <>
      {!subscription ||
      subscription.status === "completed" ||
      subscription.status === "cancelled" ? (
        <Button
          onClick={() => {
            makeSubsciptionPayment(currentUser, createSubscriptionMutation)
          }}
        >
          Make Subscription Payment
        </Button>
      ) : (
        <div className="prose md:prose-md border-2 border-green-500 p-3 rounded-lg gap-4 flex flex-col">
          <h2 className="uppercase">{subscription?.status} Subscription</h2>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="font-bold">Subscription ID:</div>
            <div>{subscription?.subscriptionId}</div>
            <div className="font-bold">Status:</div>
            <div>{subscription?.status}</div>
            <div className="font-bold">Next Due:</div>
            <div>{subscription?.current_end && subscription.current_end.toDateString()}</div>
            <div className="font-bold">Ends At:</div>
            <div>{subscription?.end_at && subscription.end_at.toDateString()}</div>
          </div>
          <Button
            onClick={() => {
              cancelSubscriptionMutation({
                subscriptionId: subscription.subscriptionId,
              })
                .then(() => {
                  showNotification({
                    title: "Subscription Cancelled",
                    message: "Your subscription will be cancelled immediately",
                  })
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000)
                })
                .catch((err) => {
                  console.log(err)
                })
                .finally(() => {
                  console.log("finally")
                })
            }}
            color="red"
          >
            Cancel Subscription
          </Button>
        </div>
      )}
    </>
  )
}
