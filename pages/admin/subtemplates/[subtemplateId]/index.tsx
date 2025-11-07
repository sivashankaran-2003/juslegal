//@ts-nocheck
import { gSSP } from "src/blitz-server"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import getSubtemplate from "src/subtemplates/queries/getSubtemplate"
import deleteSubtemplate from "src/subtemplates/mutations/deleteSubtemplate"
import RenderForm from "src/admin/components/RenderForm"
import Sidebar from "src/admin/components/Sidebar"
import Navbar from "src/admin/components/Navbar"
import getTemplateID from "src/admin/queries/getTemplate"
import getCurrentUser from "src/users/queries/getCurrentUser"
import { useModals } from "@mantine/modals"
import { showNotification } from "@mantine/notifications"
import { Text, Button } from "@mantine/core"
import getTemplatepayment from "src/template-payments/queries/getTemplatepayment"
import getSubtemplateSelect from "src/subtemplates/queries/getSubtemplateSelect"
import HeadAlert from "src/admin/components/HeadAlert"
import { Suspense } from "react"
import getSubscription from "src/subscriptions/queries/getSubscription"

export const Subtemplate = ({ subtemplate, savedData, currentUser, ispayed }) => {
  console.log("payed", ispayed)
  const router = useRouter()
  const modals = useModals()
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete Template",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the template? This action is destructive and cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Delete Subtemplate", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteSubtemplateMutation({ id: subtemplate.id }).then(() => {
          showNotification({
            title: "Subtemplate deleted",
            message: `The Subtemplate ${subtemplate.name} has been deleted`,
          })
          router.push("/admin")
        })
      },
    })
  const [deleteSubtemplateMutation] = useMutation(deleteSubtemplate)
  return (
    <>
      <Head>
        <title>Subtemplate {subtemplate.name}</title>
      </Head>
      <div className="app-container overflow-x-hidden p-5">
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
          <div className="flex flex-col gap-4">
            {currentUser.role === "ADMIN" && (
              <div className="flex flex-row gap-4 justify-center items-center w-full">
                <Link href={`/admin/subtemplates/${subtemplate.id}/edit`}>
                  <a>
                    {" "}
                    <Button color="blue" size="sm">
                      Edit
                    </Button>
                  </a>
                </Link>
                <Button
                  color={"red"}
                  type="button"
                  onClick={() => {
                    openDeleteModal()
                  }}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Delete
                </Button>
              </div>
            )}
            <RenderForm
              Template={subtemplate}
              subtemplate={true}
              payed={ispayed}
              savedData={savedData}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const ShowSubtemplatePage = ({ subtemplate, savedData, currentUser, ispayed }) => {
  console.log(savedData)
  return (
    <div>
      <Subtemplate
        currentUser={currentUser}
        savedData={savedData}
        subtemplate={subtemplate}
        ispayed={ispayed}
      />
    </div>
  )
}

export const getServerSideProps = gSSP(async ({ params, req, res, ctx }) => {
  const currentUser = await getCurrentUser(undefined, ctx)
  let subtemplate = await getSubtemplate({ id: params.subtemplateId }, ctx)
  const Template = await getTemplateID({ where: { id: subtemplate.templateId } }, ctx)
  console.log("Template", Template)
  if (currentUser?.role === "USER") {
    const payment = await getTemplatepayment({ subtemplateId: subtemplate.id }, ctx)
    subtemplate = await getSubtemplateSelect(
      {
        where: { id: params.subtemplateId },
        select: {
          id: true,
          name: true,
          description: true,
          content: payment ? true : false,
          placeholder: true,
          inputFields: true,
        },
      },
      ctx
    )
    if (Template?.visibility !== currentUser?.role) {
      if (Template?.visibility !== "ALL") {
        return {
          notFound: true,
        }
      }
    }
    let ispayed = false
    if (payment) {
      ispayed = payment?.status === "success" ? true : false
    }
    console.log("Payment is completed ", ispayed)
    const savedData = Template?.savedData ? JSON.parse(Template.savedData) : {}
    return { props: { subtemplate, currentUser, ispayed, savedData } }
  }
  const ispayed = false
  const savedData = Template?.savedData ? JSON.parse(Template.savedData) : {}
  console.log("saved data", savedData)
  if (currentUser?.role === "LAWYER") {
    const subscription = await getSubscription({}, ctx)
    if (subscription?.status === "active") {
      return { props: { subtemplate, currentUser, savedData, ispayed: true } }
    }
  }
  console.log("saved Data",savedData)
  return { props: { subtemplate, currentUser, savedData, ispayed } }
})

ShowSubtemplatePage.authenticate = true
ShowSubtemplatePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSubtemplatePage
