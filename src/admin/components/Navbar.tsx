import Link from "next/link"
import { Suspense } from "react"
import Search from "./Search"
import ThemeToggle from "./ThemeToggle"
import UserInfo from "./UserInfo"

export default function Navbar({ currentUser }) {
  return (
    <>
      <div className="app-header gap-4">
        <div className="flex lg:flex-grow flex-grow-0 gap-4 items-center">
          <Link href="/admin">
            <a className="app-name">Dashboard</a>
          </Link>
          <Suspense fallback="Loading...">
            <Search currentUser={currentUser} />
          </Suspense>
        </div>
        <div className="app-header-right">
          <ThemeToggle />
          <button className="profile-btn">
            <span>
              <Suspense fallback="Loading...">
                <UserInfo currentUser={currentUser} />
              </Suspense>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
