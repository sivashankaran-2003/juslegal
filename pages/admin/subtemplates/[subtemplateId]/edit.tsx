//@ts-nocheck
import { gSSP } from "src/blitz-server"
import { Suspense } from "react"
import Head from "next/head"
import Layout from "src/core/layouts/Layout"
import getSubtemplate from "src/subtemplates/queries/getSubtemplate"
import Navbar from "src/admin/components/Navbar"
import Sidebar from "src/admin/components/Sidebar"
import getCurrentUser from "src/users/queries/getCurrentUser"
import Template from "pages/admin/create"
import Editor from "src/admin/components/EditorFom"
import EditorInstructions from "src/admin/components/EditorInstructions"

export const EditSubtemplate = ({ currentUser, SubTemplate }) => {
  return (
    <>
      <Head>
        <title>Edit Subtemplate {SubTemplate.name}</title>
      </Head>
      <div className="app-container">
        <Navbar currentUser={currentUser} />
        <div className="app-content">
          <div className="app-sidebar">
            <Sidebar currentUser={currentUser} />
          </div>
          <div className="app-content flex flex-col items-center justify-center h-full w-[90%] md:p-10 md:m-10 gap-5 rounded-lg">
            <EditorInstructions subtemplate={true} />
            <h1 className="font-extrabold text-xl"> Main Template - {Template.name}</h1>
            <Editor Subtemplate={SubTemplate} subtemplate={true} />
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = gSSP(async ({ req, res, params, ctx }) => {
  const currentUser = await getCurrentUser(undefined, ctx)
  if (currentUser?.role !== "ADMIN") {
    return {
      notFound: true,
    }
  }
  const SubTemplate = await getSubtemplate(
    {
      id: params.subtemplateId,
    },
    ctx
  )
  return { props: { SubTemplate, currentUser } }
})

EditSubtemplate.authenticate = true
EditSubtemplate.getLayout = (page) => <Layout>{page}</Layout>

export default EditSubtemplate
