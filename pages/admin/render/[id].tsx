//@ts-nocheck
import { gSSP } from "src/blitz-server"
import Head from "next/head"
import getTemplateID from "src/admin/queries/getTemplate"
import { Suspense } from "react"
import { AuthorizationError, AuthenticationError } from "blitz"
import { useAuthorize } from "@blitzjs/auth"
import RenderForm from "src/admin/components/RenderForm"
import Sidebar from "src/admin/components/Sidebar"
import getCurrentUser from "src/users/queries/getCurrentUser"
import Navbar from "src/admin/components/Navbar"
import { GetServerSideProps } from "next"
import getTemplatepayment from "src/template-payments/queries/getTemplatepayment"
import getSubscription from "src/subscriptions/queries/getSubscription"
import HeadAlert from "src/admin/components/HeadAlert"

export const getServerSideProps: GetServerSideProps = gSSP(async ({ params, req, res, ctx }) => {
  const currentUser = await getCurrentUser(undefined, ctx)
  if (currentUser?.role === "USER") {
    const payment = await getTemplatepayment({ id: params?.id }, ctx)
    const Template = await getTemplateID(
      {
        where: { id: params?.id },
        select: {
          id: true,
          name: true,
          description: true,
          content: payment ? true : false,
          placeholder: true,
          inputFields: true,
          visibility: true,
          savedData: true,
        },
      },
      ctx
    ).catch((err) => {
      if (err instanceof AuthorizationError || err instanceof AuthenticationError) {
        res.writeHead(302, {
          Location: "/admin",
        })
        res.end()
      }
    })
    if (Template?.visibility !== currentUser?.role) {
      if (Template?.visibility !== "ALL") {
        return {
          notFound: true,
        }
      }
    }
    // if (Template?.visibility !== currentUser?.role) {
    //   return {
    //     notFound: true,
    //   }
    // }
    // check if the template visibility is the user and if not check if the visibility is set to all
    var ispayed = false
    if (payment) {
      ispayed = payment?.status === "success" ? true : false
    }
    console.log("Payment is completed ", ispayed)
    return { props: { Template, currentUser, ispayed } }
  }
  const Template = await getTemplateID(
    {
      where: { id: params?.id },
      select: {
        id: true,
        name: true,
        description: true,
        content: true,
        placeholder: true,
        inputFields: true,
        visibility: true,
        savedData: true,
      },
    },
    ctx
  ).catch((err) => {
    if (err instanceof AuthorizationError || err instanceof AuthenticationError) {
      res.writeHead(302, {
        Location: "/admin",
      })
      res.end()
    }
  })
  if (currentUser?.role !== "ADMIN") {
    if (Template?.visibility !== currentUser?.role) {
      if (Template?.visibility !== "ALL") {
        return {
          notFound: true,
        }
      }
    }
  }
  if (currentUser?.role === "LAWYER") {
    const subscription = await getSubscription({}, ctx)
    if (subscription?.status === "active") {
      return { props: { Template, currentUser, ispayed: true } }
    }
  }
  return { props: { Template, currentUser } }
})

function TemplateRender({ Template, currentUser, ispayed = false }) {
  useAuthorize()
  // console.log(ispayed)
  return (
    <>
      <Head>
        <title>Template Render</title>
      </Head>
      <div className="app-container overflow-x-hidden">
        {currentUser?.role === "LAWYER" && (
          <Suspense fallback={<div></div>}>
            <HeadAlert />
          </Suspense>
        )}
        <Navbar currentUser={currentUser} />
        <div className="app-content">
          <div className="app-sidebar">
            <Sidebar currentUser={currentUser} />
          </div>
          <RenderForm Template={Template} payed={ispayed} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

TemplateRender.authenticate = true

export default TemplateRender
