import { useMutation } from "@blitzjs/rpc";
import createPDFMutation from "../mutations/createPDF"
import { useRouter } from "next/router"


export default function PDFButton({ Template, editorHtml, subtemplate }) {
  const [createPDF] = useMutation(createPDFMutation)
  const router = useRouter()
  return (
    <div>
      <button
        onClick={() => {
          //create a GET request on api/getPDF?html=<html> and download the pdf response
          //get the template name
          const templateName = Template.name
          const templateId = Template.id
          // get the html from the editor
          const content = editorHtml
          const date = new Date()
          const name = Template.name + "-" + date.toLocaleString()
          const url = `https://juslegal-pdf-download.vercel.app/api/getPDF`
          const xhr = new XMLHttpRequest()
          // Send a post request with the html string
          xhr.open("POST", url, true)
          xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
          xhr.responseType = "arraybuffer"
          xhr.onload = function (e) {
            if (this.status === 200) {
              var blob = new Blob([this.response], { type: "application/pdf" })
              var link = document.createElement("a")
              link.href = window.URL.createObjectURL(blob)
              link.download = "download.pdf"
              link.click()
              document.getElementById("down")!.textContent = "Download as PDF"
              createPDF({
                id: templateId,
                templateName,
                content,
                name,
                subtemplate
              })
              router.push("/admin")
            } else {
              alert("An error occured")
            }
          }
          xhr.onprogress = (event) => {
            const loader = event.loaded / event.total
            // console.log("loader", loader)
            document.getElementById("down")!.textContent = `Downloaded ${Math.round(loader * 100)}%`
          }
          //Set the conntent of the download button to Loading
          document.getElementById("down")!.textContent = "Downloading..."
          // Send the request
          xhr.send(JSON.stringify({ html: editorHtml }))
        }}
        className="py-2 px-4 text-white  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 p-white w-full transition ease-in duration-200 p-center p-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
      >
        <span id="down">Download as PDF</span>
      </button>
    </div>
  )
}
