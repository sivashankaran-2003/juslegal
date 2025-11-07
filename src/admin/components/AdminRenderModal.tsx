import Link from "next/link"
import nextColor from "../utils/nextColor"
import SubtemplateModal from "./SubtemplateModal"

export default function AdminRenderModal({ selected, currentUser }) {
  return (
    <div className="flex flex-col gap-4 items-center justify center w-full">
      {/* <h2 className="font-extrabold text-xl text-center">{selected.name}</h2>
      <p className="text-gray-600 text-center">{selected.description}</p> */}
      <div className="p-5 flex divide-x-2 flex-col md:flex-row gap-4 items-center justify-center">
        <Link href="/admin/render/[id]" as={`/admin/render/${selected.id}`}>
          <a
            className="rounded-xl p-5 text-lg drop-shadow-2xl"
            style={{ backgroundColor: nextColor(0) }}
          >
            <div className="flex lg:flex-row flex-col justify-center items-center gap-2">
              <h2 className="text-2xl font-bold text-center text-black">Document Details</h2>
            </div>
            <div className="block items-center justify-center">
              <p className="block text-black">Name: {selected.name}</p>
            </div>
            <div className="block text-black items-center justify-center">
              <p className="text-md">Description:</p>
              <div className="text-sm items-center justify-center" style={{ color: "#000000" }}>
                {selected.description}
              </div>
            </div>
          </a>
        </Link>
        <div className="md:w-3/4">
          <SubtemplateModal id={selected.id} itemsPerPage={3} currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}
