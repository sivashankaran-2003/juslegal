import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import { memo, Suspense, useState } from "react"
import { Tooltip } from "@mantine/core"
import logout from "src/auth/mutations/logout"
import { Modal } from "@mantine/core"
import Payments from "./Payments"
import SubscriptionPayments from "./SubscriptionPayments"

function Sidebar({ currentUser }) {
  const [opened, setOpened] = useState(false)
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Payments"
        size="lg"
        overflow="inside"
        radius={"lg"}
      >
        <div className="p-5">
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
          {currentUser?.role === "ADMIN" && (
            <Suspense fallback="loading...">
              <Payments currentUser={currentUser} />
            </Suspense>
          )}
        </div>
      </Modal>
      <Tooltip label="Home" position="right" withArrow>
        <Link href="/admin">
          <a className="app-sidebar-link active">
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
              className="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </a>
        </Link>
      </Tooltip>
      <Tooltip label="Payments" position="right" withArrow>
        <a className="app-sidebar-link active text-lg" onClick={() => setOpened(true)}>
          &#8377;
        </a>
      </Tooltip>
      {currentUser?.role === "ADMIN" && (
        <Tooltip label="Create New Template" position="right" withArrow>
          <Link href="/admin/create" title="Add New Project">
            <a className="add-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="btn-icon feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </a>
          </Link>
        </Tooltip>
      )}
      <Tooltip label="Logout" position="right" withArrow>
        <a
          className="app-sidebar-link"
          onClick={async (e) => {
            e.preventDefault()
            await logoutMutation()
            // redirect to the login page
            window.location.href = "/login"
          }}
        >
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            width="25"
            height="25"
            className="dark:fill-white fill-black"
            viewBox="0 0 384.971 384.971"
          >
            <g>
              <g id="Sign_Out">
                <path
                  d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
C192.485,366.299,187.095,360.91,180.455,360.91z"
                />
                <path
                  d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"
                />
              </g>
            </g>
          </svg>
        </a>
      </Tooltip>
    </>
  )
}

export default memo(Sidebar)
