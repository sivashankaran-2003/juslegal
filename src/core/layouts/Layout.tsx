import Head from "next/head";
import { BlitzLayout } from "@blitzjs/next";

const Layout: BlitzLayout<{title?: string, children?: React.ReactNode}> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "lawyer-admin"}</title>
      </Head>
      {children}
    </>
  )
}

export default Layout
