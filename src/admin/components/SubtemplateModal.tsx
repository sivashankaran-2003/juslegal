import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import nextColor from "../utils/nextColor"
import { Pagination } from "@mantine/core"
import { useState } from "react"
import getSubtemplates from "src/subtemplates/queries/getSubtemplates"

export default function SubtemplateModal({ id, itemsPerPage = 9, currentUser }) {
  const [activePage, setPage] = useState(1)
  const [{ subtemplates, count }] = usePaginatedQuery(getSubtemplates, {
    orderBy: { id: "asc" },
    where: {
      templateId: id,
    },
    select: {
      name: true,
      description: true,
      id: true,
    },
    skip: itemsPerPage * (activePage - 1),
    take: itemsPerPage,
  })
  var vcount = 0
  return (
    <>
      {currentUser?.role === "ADMIN" && (
        <Link href={`/admin/${id}/subtemplates/new`}>
          <a className="flex flex-row gap-4 justify-center items-center p-4">
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
            Create New Subtemplate
          </a>
        </Link>
      )}
      {subtemplates.length === 0 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-center text-black w-full">
            No Subtemplates Found...
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 space-y-4 items-center justify-center p-5 w-full">
        {/* If there are no templated to show that */}
        {subtemplates.map((project) => (
          <Link
            //@ts-ignore
            key={project.id}
            href="/admin/subtemplates/[subtemplateId]"
            //@ts-ignore
            as={`/admin/subtemplates/${project.id}`}
            className="rounded-xl p-5 text-lg drop-shadow-2xl"
            style={{ backgroundColor: nextColor(vcount++) }}
          >
            <a
              className="rounded-xl p-5 text-lg drop-shadow-2xl"
              style={{ backgroundColor: nextColor(vcount++) }}
            >
              <div className="flex lg:flex-row flex-col justify-center items-center gap-2">
                <h2 className="text-2xl font-bold text-center text-black">Sub Document</h2>
              </div>
              <div className="block">
                {/* @ts-ignore */}
                <p className="block text-black items-center justify-center">Name: {project.name}</p>
              </div>
              <div className="block text-black items-center justify-center">
                {/* <p className="text-md">Template Description:</p> */}
                <div className="text-sm items-center justify-center" style={{ color: "#000000" }}>
                  {/* @ts-ignore */}
                  {project.description}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      {Math.ceil(count / itemsPerPage) !== 0 && (
        <div className="flex justify-center items-center md:p-10">
          <Pagination
            page={activePage}
            onChange={setPage}
            total={Math.ceil(count / itemsPerPage)}
            radius="xl"
            withEdges
          />
        </div>
      )}
    </>
  )
}
