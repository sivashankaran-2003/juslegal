//@ts-nocheck
import { gSSP } from "src/blitz-server"
import React from "react"
import Head from "next/head"
import { useAuthorize } from "@blitzjs/auth"
import getTemplateID from "src/admin/queries/getTemplate"
import getCategories from "src/admin/queries/getCategories"
import getCategoryName from "src/admin/queries/getCategoryName"
import Sidebar from "src/admin/components/Sidebar"
import getCurrentUser from "src/users/queries/getCurrentUser"
import EditorInstructions from "src/admin/components/EditorInstructions"
import Navbar from "src/admin/components/Navbar"
import Editor from "src/admin/components/EditorFom"

export const getServerSideProps = gSSP(async ({ params, req, res, ctx }) => {
  const currentUser = await getCurrentUser(undefined, ctx)
  if (currentUser?.role !== "ADMIN") {
    return {
      notFound: true,
    }
  }
  const Template = await getTemplateID({ where: { id: params.id } }, ctx)
  const categories = await getCategories()
  const initCategory = await getCategoryName({ id: Template?.categoryIds }, ctx)
  return { props: { Template, categories, initCategory, currentUser } }
})

function Update({ Template, categories, initCategory, currentUser }) {
  useAuthorize()
  return (
    <>
      <Head>
        <title>Template</title>
      </Head>
      <div className="app-container">
        <Navbar currentUser={currentUser} />
        <div className="app-content">
          <div className="app-sidebar">
            <Sidebar currentUser={currentUser} />
          </div>
          <div className="app-content flex flex-col items-center justify-center h-full w-[82%] md:p-10 md:m-10 p-2 gap-5 rounded-lg">
            <EditorInstructions />
            <Editor categories={categories} Template={Template} initCategory={initCategory} />
          </div>
        </div>
      </div>
    </>
  )
}

Update.authenticate = true

export default Update
