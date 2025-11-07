import { showNotification } from "@mantine/notifications"
const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"

    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }

    document.body.appendChild(script)
  })
}

export const makePayment = async (
  currentUser,
  template,
  createTemplatepayment,
  isSubtemplate = false
) => {
  const res = await initializeRazorpay()

  if (!res) {
    alert("Razorpay SDK Failed to load")
    return
  }

  // Make API call to the serverless API
  const data = await fetch("/api/payments/razorpay", { method: "POST" }).then((t) => t.json())
  console.log(data)
  var options = {
    key: process.env.RAZORPAY_KEYID, // Enter the Key ID generated from the Dashboard
    name: "Lawyer Admin Payment Test",
    currency: data.currency,
    amount: data.amount,
    order_id: data.id,
    description: "Test Payment Using Razorpay",
    image:
      "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    handler: async function (response) {
      // Validate payment at server - using webhooks is a better idea.
      console.log(response)
      if (!isSubtemplate) {
        await createTemplatepayment({
          amount: data.amount,
          currency: data.currency,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          id: currentUser.id,
          templateId: template.id,
          status: "success",
        }).then(() => {
          showNotification({
            title: "Payment Successfull for the template " + template.name,
            message:
              "Refreshing the page in 2 seconds to show the complete template",
          })
          //wait for 2 seconds and refresh the page
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
      } else {
        await createTemplatepayment({
          amount: data.amount,
          currency: data.currency,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          id: currentUser.id,
          subtemplateId: template.id,
          status: "success",
        }).then(() => {
          showNotification({
            title: "Payment Successfull for the subtemplate " + template.name,
            message:
              "Refreshing the page in 2 seconds to show the complete template",
          })
          //wait for 2 seconds and refresh the page
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
      }
    },
    prefill: {
      name: currentUser.name || "",
      email: currentUser.email,
    },
  }
  //@ts-ignore
  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}

export const makeSubsciptionPayment = async (currentUser, CreateSubscription) => {
  const res = await initializeRazorpay()

  if (!res) {
    alert("Razorpay SDK Failed to load")
    return
  }

  // Make API call to the serverless API
  const data = await fetch("/api/payments/subscription", { method: "POST" }).then((t) => t.json())
  console.log(data)
  var options = {
    key: process.env.RAZORPAY_KEYID, // Enter the Key ID generated from the Dashboard
    name: "Lawyer Admin Payment Test",
    subscription_id: data.id,
    description: "Test Payment Using Razorpay",
    image:
      "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    handler: function (response) {
      // Validate payment at server - using webhooks is a better idea.
      console.log(response)
      CreateSubscription({
        planId: data.plan_id,
        subscriptionId: data.id,
        status: "created",
      }).then(() => {
        showNotification({
          title: "Payment Successfull for the subscription",
          message:
            "Refreshing the page in 2 seconds to show all complete template and subtemplates",
        })
        //wait for 2 seconds and refresh the page
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
    },
    prefill: {
      name: currentUser.name || "",
      email: currentUser.email,
    },
  }
  //@ts-ignore
  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}
