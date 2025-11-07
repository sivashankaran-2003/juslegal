import { useMutation, usePaginatedQuery } from "@blitzjs/rpc"
import { useState, memo, Suspense } from "react"
import { useRouter } from "next/router"
import { Loader, Tooltip } from "@mantine/core"
import { Select, Modal } from "@mantine/core"
import pagnatedTemplates from "../queries/pagnatedTemplates"
import deleteTemplate from "src/admin/mutations/deleteTemplate"
import nextColor from "src/admin/utils/nextColor"
import { Pagination } from "@mantine/core"
import AdminRenderModal from "./AdminRenderModal"
import { useModals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { showNotification } from "@mantine/notifications"

const ITEMS_PER_PAGE = 9

function Filtered({ currentUser, categories }) {
  const modals = useModals()
  const openDeleteModal = (project) =>
    modals.openConfirmModal({
      title: "Delete Template",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the template? This action is destructive and cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Delete Template", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteTemplateMutation({ id: project.id }).then(() => {
          window.location.reload()
          showNotification({
            title: "Template deleted",
            message: `The template ${project.name} has been deleted`,
          })
        })
      },
    })
  categories = categories.map((category) => {
    return {
      label: category.name,
      value: category.name,
    }
  })
  const [filter, setFilter] = useState("")
  // loop over the Templates array if the currentUser have role 'USER'
  // render only those Template that the currentUser is allowed to see
  var vcount = 0
  const [deleteTemplateMutation] = useMutation(deleteTemplate)
  // const user = useCurrentUser()
  const router = useRouter()
  const [activePage, setPage] = useState(1)
  const [{ Templates, count }] = usePaginatedQuery(pagnatedTemplates, {
    orderBy: { id: "asc" },
    where: {
      //also get all the templates whose visibility is set to all
      visibility: currentUser?.role != "ADMIN" ? { in: [currentUser?.role, "ALL"] } : undefined,
      Category: {
        some: filter ? {
          name: {
            contains: filter
          }
        } : undefined
      }
    },
    select: {
      name: true,
      description: true,
      id: true,
    },
    skip: ITEMS_PER_PAGE * (activePage - 1),
    take: ITEMS_PER_PAGE,
  })

  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState({ name: "", id: "", description: "" })

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        radius="lg"
        size="90%"
        overflow="inside"
      >
        <Suspense
          fallback={
            <div className="p-10 m-5 flex justify-center items-center">
              <Loader color="cyan" variant="dots" size="lg" />
            </div>
          }
        >
          <AdminRenderModal selected={selected} currentUser={currentUser} />
        </Suspense>
      </Modal>
      <div className="p-5 lg:w-1/3">
        <Select
          label="Categories"
          name="categories"
          searchable
          clearable
          radius="xl"
          value={filter}
          // @ts-ignore
          onChange={setFilter}
          data={categories}
          placeholder="Select Categories"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 space-y-4 items-center justify-center p-5 w-full">
        {/* If there are no templated to show that */}
        {(!Templates || (Array.isArray(Templates) && Templates.length === 0)) && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-center text-black">No templates to show...</h2>
          </div>
        )}
        {Array.isArray(Templates) ? Templates.map((project) => (
          <a
            key={project.id}
            className="rounded-xl p-5 text-lg drop-shadow-2xl"
            style={{ backgroundColor: nextColor(vcount++) }}
            onClick={() => {
              if (currentUser?.role !== "USER") {
                setOpened(true)
                //@ts-ignore
                setSelected(project)
              } else {
                router.push(`/admin/render/${project.id}`)
              }
            }}
          >
            <div className="flex lg:flex-row flex-col justify-center items-center gap-2">
              {currentUser?.role === "ADMIN" && (
                <Tooltip label="Edit Template" position="top" withArrow>
                  <svg
                    version="1.1"
                    x="0px"
                    y="0px"
                    width="25px"
                    height="25px"
                    onClick={async (e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      //console.log("clicked")
                      router.push(`/admin/update/${project.id}`)
                      //console.log(project.id)
                    }}
                    style={{ fill: "#000" }}
                    viewBox="0 0 490.337 490.337"
                  >
                    <g>
                      <g>
                        <path
                          d="M229.9,145.379l-47.5,47.5c-17.5,17.5-35.1,35-52.5,52.7c-4.1,4.2-7.2,9.8-8.4,15.3c-6.3,28.9-12.4,57.8-18.5,86.7
      l-3.4,16c-1.6,7.8,0.5,15.6,5.8,20.9c4.1,4.1,9.8,6.4,15.8,6.4c1.7,0,3.4-0.2,5.1-0.5l17.6-3.7c28-5.9,56.1-11.9,84.1-17.7
      c6.5-1.4,12-4.3,16.7-9c78.6-78.7,157.2-157.3,235.8-235.8c5.8-5.8,9-12.7,9.8-21.2c0.1-1.4,0-2.8-0.3-4.1c-0.5-2-0.9-4.1-1.4-6.1
      c-1.1-5.1-2.3-10.9-4.7-16.5l0,0c-14.7-33.6-39.1-57.6-72.5-71.1c-6.7-2.7-13.8-3.6-20-4.4l-1.7-0.2c-9-1.1-17.2,1.9-24.3,9.1
      C320.4,54.879,275.1,100.179,229.9,145.379z M386.4,24.679c0.2,0,0.3,0,0.5,0l1.7,0.2c5.2,0.6,10,1.2,13.8,2.8
      c27.2,11,47.2,30.6,59.3,58.2c1.4,3.2,2.3,7.3,3.2,11.6c0.3,1.6,0.7,3.2,1,4.8c-0.4,1.8-1.1,3-2.5,4.3
      c-78.7,78.5-157.3,157.2-235.9,235.8c-1.3,1.3-2.5,1.9-4.3,2.3c-28.1,5.9-56.1,11.8-84.2,17.7l-14.8,3.1l2.8-13.1
      c6.1-28.8,12.2-57.7,18.4-86.5c0.2-0.9,1-2.3,1.9-3.3c17.4-17.6,34.8-35.1,52.3-52.5l47.5-47.5c45.3-45.3,90.6-90.6,135.8-136
      C384.8,24.979,385.7,24.679,386.4,24.679z"
                        />
                        <path
                          d="M38.9,109.379h174.6c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H38.9c-21.5,0-38.9,17.5-38.9,38.9v327.4
      c0,21.5,17.5,38.9,38.9,38.9h327.3c21.5,0,38.9-17.5,38.9-38.9v-167.5c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v167.5
      c0,7.9-6.5,14.4-14.4,14.4H38.9c-7.9,0-14.4-6.5-14.4-14.4v-327.3C24.5,115.879,31,109.379,38.9,109.379z"
                        />
                      </g>
                    </g>
                  </svg>
                </Tooltip>
              )}
              <h2 className="text-2xl font-bold text-center text-black">Document Details</h2>
              {currentUser?.role === "ADMIN" && (
                <Tooltip label="Delete Template" position="top" withArrow>
                  <svg
                    x="0px"
                    y="0px"
                    width="25px"
                    height="25px"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      openDeleteModal(project)
                      //reload page
                    }}
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <polygon
                        style={{ fill: "#F4B2B0" }}
                        points="190.551,495.523 117.226,495.523 87.886,113.866 190.551,113.866 	"
                      />
                      <polygon
                        style={{ fill: "#F4B2B0" }}
                        points="394.773,495.523 321.448,495.523 321.448,113.866 424.112,113.866 	"
                      />
                    </g>
                    <g>
                      <path
                        style={{ fill: "#B3404A" }}
                        d="M468.321,97.389h-44.208H321.446H190.551H87.888h-44.21c-9.1,0-16.477,7.378-16.477,16.477
    s7.377,16.477,16.477,16.477h28.95l28.168,366.444c0.661,8.585,7.818,15.213,16.429,15.213h73.325h51.333
    c9.1,0,16.477-7.378,16.477-16.477s-7.377-16.477-16.477-16.477H207.03V130.343h97.941v365.18c0,9.099,7.378,16.477,16.477,16.477
    h73.327c8.611,0,15.769-6.629,16.429-15.213l28.169-366.444h28.949c9.099,0,16.477-7.378,16.477-16.477
    S477.419,97.389,468.321,97.389z M174.074,479.046h-41.589L105.68,130.343h68.394V479.046L174.074,479.046z M379.513,479.046
    h-41.59V130.343h68.397L379.513,479.046z"
                      />
                      <path
                        style={{ fill: "#B3404A" }}
                        d="M332.693,75.578c-9.099,0-16.477-7.379-16.477-16.477V32.954HH201.899V59.1
    c0,9.099-7.377,16.477-16.477,16.477s-16.477-7.379-16.477-16.477V16.477C168.944,7.378,176.321,0,185.421,0h147.272
    c9.099,0,16.477,7.378,16.477,16.477V59.1C349.17,68.201,341.794,75.578,332.693,75.578z"
                      />
                    </g>
                  </svg>
                </Tooltip>
              )}
            </div>
            <div className="block">
              <p className="block text-black">Name: {project.name}</p>
            </div>
            <div className="block text-black items-center justify-center">
              <p className="text-md">Description:</p>
              <div className="text-sm items-center justify-center" style={{ color: "#000000" }}>
                {project.description}
              </div>
            </div>
          </a>
        )) : null}
      </div>
      {Math.ceil(count / ITEMS_PER_PAGE) !== 0 && (
        <div className="flex justify-center items-center md:p-10">
          <Pagination
            page={activePage}
            onChange={setPage}
            total={Math.ceil(count / ITEMS_PER_PAGE)}
            radius="xl"
            withEdges
          />
        </div>
      )}
    </>
  )
}

export default memo(Filtered)
