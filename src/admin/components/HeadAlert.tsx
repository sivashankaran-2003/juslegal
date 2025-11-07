import { useQuery } from "@blitzjs/rpc"
import getSubscription from "src/subscriptions/queries/getSubscription"
import { useEffect, useState } from "react"
export default function HeadAlert() {
  const [subscription] = useQuery(getSubscription, null, {suspense: false})
  const [color, setColor] = useState("")
  useEffect(() => {
    if (subscription?.status === "completed") {
      setColor("#FF2A00")
    } else if (subscription?.status === "cancelled") {
      setColor("#FF2A00")
    } else if (subscription?.status === "active") {
      setColor("#28A251")
    } else {
      setColor("#2A00FF")
    }
  }, [subscription])
  return (
    <>
      <div className={`text-center py-1 lg:px-4 w-full`} style={{ backgroundColor: color }}>
        <div
          className={`p-2 items-center text-gray-100 leading-none lg:rounded-full flex lg:inline-flex`}
          role="alert"
        >
          <span className={`flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3`}>
            {subscription?.status}
          </span>
          {!subscription?.status ? (
            <span className="font-semibold mr-2 text-left flex-auto">
              You have no active subscription
            </span>
          ) : (
            <span className="font-semibold mr-2 text-left flex-auto">
              You have a currenly {subscription?.status} subscription
            </span>
          )}
        </div>
      </div>
    </>
  )
}
