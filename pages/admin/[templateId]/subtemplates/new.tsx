//@ts-nocheck
import { gSSP } from "src/blitz-server"
import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import Editor from "src/admin/components/EditorFom"
import getCurrentUser from "src/users/queries/getCurrentUser"
import getTemplateID from "src/admin/queries/getTemplate"
import Navbar from "src/admin/components/Navbar"
import Sidebar from "src/admin/components/Sidebar"
import EditorInstructions from "src/admin/components/EditorInstructions"
const NewSubtemplatePage: BlitzPage = ({ currentUser, Template }) => {
  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} />
      <div className="app-content">
        <div className="app-sidebar">
          <Sidebar currentUser={currentUser} />
        </div>
        <div className="app-content flex flex-col items-center justify-center h-full w-[90%] md:p-10 md:m-10 gap-5 rounded-lg">
          <EditorInstructions subtemplate={true} />
          <h1 className="font-extrabold text-xl"> Main Template - {Template.name}</h1>
          <Editor Template={Template} subtemplate={true} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = gSSP(async ({ req, res, params , ctx }) => {
  const templateId = params.templateId
  const currentUser = await getCurrentUser(undefined, ctx)
  if (currentUser?.role !== "ADMIN") {
    return {
      notFound: true,
    }
  }
  const Template = await getTemplateID(
    {
      where: {
        id: templateId,
      },
    },
    ctx
  )
  return { props: { Template, currentUser } }
})

NewSubtemplatePage.authenticate = true
NewSubtemplatePage.getLayout = (page) => <Layout title={"Create New Subtemplate"}>{page}</Layout>

export default NewSubtemplatePage
