//@ts-nocheck
import { gSSP } from "src/blitz-server"
import React from "react"
import { useAuthorize } from "@blitzjs/auth"
import Head from "next/head"
import getCategories from "src/admin/queries/getCategories"
import Editor from "src/admin/components/EditorFom"
import getCurrentUser from "src/users/queries/getCurrentUser"
import Sidebar from "src/admin/components/Sidebar"
import EditorInstructions from "src/admin/components/EditorInstructions"
import Navbar from "src/admin/components/Navbar"
function Template({ categories, currentUser }) {
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
          <div className="app-content flex flex-col items-center justify-center h-full w-[90%] md:p-10 md:m-10 gap-5 rounded-lg">
            <EditorInstructions />
            <Editor categories={categories} />
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = gSSP(async ({ req, res ,ctx}) => {
  const currentUser = await getCurrentUser(undefined, ctx)
  if (currentUser?.role !== "ADMIN") {
    return {
      notFound: true,
    }
  }
  const categories = await getCategories()
  return { props: { categories, currentUser } }
})

Template.authenticate = true

export default Template
