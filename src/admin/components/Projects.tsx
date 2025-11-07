import { Suspense, memo } from "react"
import Recent from "src/admin/components/Recent"
import Filtered from "src/admin/components/Filtered"
import { Loader, Pagination } from "@mantine/core"

const Projects = ({ currentUser, categories }) => {
  return (
    <>
      {/* <Pagination total={10} /> */}
      <div className="prose prose-lg dark:prose-invert">
        <h2>Recently Used Documents</h2>
      </div>
      <Suspense
        fallback={
          <div className="p-10 m-5 flex justify-center items-center">
            <Loader color="cyan" variant="dots" size="lg" />
          </div>
        }
      >
        <Recent currentUser={currentUser} />
      </Suspense>
      <div className="prose prose-lg dark:prose-invert">
        <h2>Filter Documents</h2>
      </div>
      <Suspense
        fallback={
          <div className="p-10 m-5 flex justify-center items-center">
            <Loader color="cyan" variant="dots" size="lg" />
          </div>
        }
      >
        {/* <Filtered currentUser={currentUser} categories={categories} /> */}
      </Suspense>
    </>
  )
}

export default memo(Projects)
