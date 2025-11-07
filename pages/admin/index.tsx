//@ts-nocheck
import { gSSP } from "src/blitz-server"
import { useAuthorize } from "@blitzjs/auth"
import Head from "next/head"
import { Suspense } from "react"
import getCurrentUser from "src/users/queries/getCurrentUser"
import getCategories from "src/admin/queries/getCategories"
import Sidebar from "src/admin/components/Sidebar"
import NumberOfTemplates from "src/admin/components/NumberOfTemplates"
import Projects from "src/admin/components/Projects"
import CompleteSetup from "src/admin/components/CompleteSetup"
import Navbar from "src/admin/components/Navbar"
import HeadAlert from "src/admin/components/HeadAlert"

AdminHomePage.suppressFirstRenderFlicker = true

export const getServerSideProps = gSSP(async ({ req, res, ctx }) => {
  const currentUser = await getCurrentUser(undefined, ctx)
  const categories = await getCategories()
  return { props: { currentUser, categories } }
})

function AdminHomePage({ currentUser, categories }) {
  useAuthorize()
  if (currentUser && currentUser.updatedRole === false) {
    return <CompleteSetup currentUser={currentUser} />
  } else {
    const date = new Date()
    return (
      <div>
        <Head>
          <title>Admin</title>
        </Head>
        <Suspense fallback="Loading...">
          <div className="app-container">
            {currentUser?.role === "LAWYER" && (
              <Suspense fallback={<div></div>}>
                <HeadAlert />
              </Suspense>
            )}
            <Navbar currentUser={currentUser} />
            <div className="app-content">
              <div className="app-sidebar">
                <Suspense fallback="Loading...">
                  <Sidebar currentUser={currentUser} />
                </Suspense>
              </div>
              <div className="projects-section p-0 md:p-[32px]">
                <div className="projects-section-header">
                  <p>Documents</p>
                  <p className="time">{date.toDateString()}</p>
                </div>
                <div className="projects-section-line">
                  <div className="projects-status">
                    <div className="item-status">
                      <Suspense fallback="loading...">
                        <NumberOfTemplates currentUser={currentUser} />
                      </Suspense>
                      <span className="status-type">Total Number of Documents</span>
                    </div>
                  </div>
                </div>
                <div className="project-boxes jsGridView">
                  <div className="project-box-wrapper">
                    <Projects currentUser={currentUser} categories={categories} />
                  </div>
                </div>
              </div>
              {/* <div className="hidden md:block messages-section">
              <button className="messages-close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </button>
              <div className="projects-section-header">
                <p>Payment Notifications</p>
              </div>
              <div className="messages">
                <div className="message-box">
                  <div className="message-content">
                    {currentUser?.role === "USER" && (
                      <Suspense fallback="loading...">
                        <Payments currentUser={currentUser} />
                      </Suspense>
                    )}
                    {currentUser?.role === "LAWYER" && (
                      <Suspense fallback="loading...">
                        <SubscriptionPayments currentUser={currentUser} />
                      </Suspense>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </Suspense>
      </div>
    )
  }
}

AdminHomePage.authenticate = { redirectTo: "/login" }

export default AdminHomePage
