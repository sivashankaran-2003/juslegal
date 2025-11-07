import { useMutation } from "@blitzjs/rpc"
import { Formik, FieldArray, Field, FormikProps } from "formik"
import React, { Suspense } from "react"
import PDFButton from "./PDFButton"
import updateTemplate from "../mutations/updateTemplate"
import { Loader, Modal } from "@mantine/core"
import SubtemplateModal from "./SubtemplateModal"
import CustomSelect from "./CustomSelect"
import { showNotification } from "@mantine/notifications"
import { Button } from "@mantine/core"
import { SegmentedControl } from "@mantine/core"
import { makePayment } from "src/razorpay"
import createTemplatepayment from "src/template-payments/mutations/createTemplatepayment"

export default function RenderForm({
  Template,
  subtemplate = false,
  payed = false,
  savedData = [],
  currentUser,
}) {
  // console.log("saved Data", savedData)
  const [createTemplatepaymentMutation] = useMutation(createTemplatepayment)
  const [adminvalue, setadminvalue] = React.useState("placeholder")
  const [updateTemplateMutation] = useMutation(updateTemplate)
  const [opened, setOpened] = React.useState(false)
  // Loop over the Template and check for the one with the given name
  console.log("Template", Template)
  const inputFields = JSON.parse(Template?.inputFields ?? {})
  const [editorHtml, setEditorHtml] = React.useState<string>(
    payed ? Template?.content : Template?.placeholder
  )
  const renderName = (props: any[] | FormikProps<any>) => {
    var editorHtmll = editorHtml
    //render the props to the match placeholder in the editor
    //and replace the placeholder with the props;
    for (var i = 0; i < inputFields.length; i++) {
      var inputField = inputFields[i]
      //console.log(inputField.name)
      for (var key in props.values) {
        //console.log(key)
        if (key === inputField.name) {
          //console.log(key)
          //console.log(inputField.name)
          //console.log(props.values[key])
          if (inputField.type == "file") {
            //get the image from the user input
            const files = document.getElementById(inputField.name) as HTMLInputElement
            const file = files.files![0]
            if (file) {
              const fileReader = new FileReader()
              fileReader.readAsDataURL(file)
              fileReader.onload = () => {
                //replace the placeholder with the image
                //convert the base64 to a blob
                const base64 = fileReader.result
                //replace the placeholder with the image with src as base64
                editorHtmll = editorHtmll.replace(
                  new RegExp(`{${inputField.name}}`, "g"),
                  `<img width="200" src="${base64}" />`
                )
                setEditorHtml(editorHtmll)
              }
            }
          } else {
            // editorHtmll = editorHtmll.replace(`{${inputField.name}}`, props.values[key])
            if (typeof props.values[key] === "object") {
              // editorHtmll = editorHtmll.replace(`{${inputField.name}}`, props.values[key].join(", "))
              if (props.values[key].length == 1) {
                // editorHtmll = editorHtmll.replace(`{${inputField.name}}`, props.values[key][0])
                // value is in the form of {name: "value",address: "value"} so we need to split it
                const name = props.values[key][0].name
                const address = props.values[key][0].address
                if (!name || !address) {
                  editorHtmll = editorHtmll.replace(new RegExp(`{${inputField.name}}`, "g"), "")
                } else {
                  const values = `
                  <div style="width: 50%;">
                    <span style="display:block;">${name}</span>
                    <span style="display:block;">${address}</span>
                  </div>
                  `
                  editorHtmll = editorHtmll.replace(new RegExp(`{${inputField.name}}`, "g"), values)
                }
              } else {
                // Join the each string in array with a <p>{value}</p>
                var values = props.values[key]
                  .map((value: { name: string; address: string }, index: number) => {
                    // console.log(index)
                    const name = value.name
                    const address = value.address
                    if (!name || !address) {
                      return ""
                    }
                    const ind = index + 1
                    return `
                      <div style="display:flex; gap:10px; padding:5px; width: 50%;">
                        <div>[${ind}].</div>
                        <div style="display:flex flex-direction:column; gap:10px">
                          <span style="display:block;">${name}</span>
                          <span style="display:block;">${address}</span>
                        </div>
                      </div>
                    `
                  })
                  .join("")
                // values = `<ol>${values}</ol>`
                editorHtmll = editorHtmll.replace(new RegExp(`{${inputField.name}}`, "g"), values)
              }
            } else {
              // replace all instances of the placeholder with the value
              editorHtmll = editorHtmll.replace(
                new RegExp(`{${inputField.name}}`, "g"),
                props.values[key]
              )
            }
          }
        }
      }
    }
    //console.log(editorHtmll)
    // this.setState({ editorHtml: editorHtml });
    setEditorHtml(editorHtmll)
  }
  //Generate initial values for the form based on the input fields present in the Template
  var initialValues = inputFields.reduce(
    (acc: { [x: string]: any }, curr: { name: string | number; type: string }) => {
      acc[curr.name] = [""]
      if (Template.savedData) {
        if (curr.type === "person") {
          const sd = JSON.parse(Template.savedData)
          console.log("sd", sd)
          //sd contains a set of keys that contain an array
          //create new entries for each key
          const keys = Object.keys(sd)
          console.log("keys", keys)
          for (var i = 0; i < keys.length; i++) {
            //@ts-ignore
            acc[keys[i]] = sd[keys[i]]
          }
        }
      }
      return acc
    },
    {}
  )
  console.log(initialValues)
  //0: {name: 'test name', address: 'name'}
  //1: {name: 'test2', address: 'add2'}
  //create the above JSON array to the format label:name and value: the JSON object
  var selectionOptions: {
    label: string
    value: never
  }[]
  console.log(savedData)
  // if (savedData && savedData.length > 0) {
  //   selectionOptions = savedData.map((value, index) => {
  //     return {
  //       //@ts-ignore
  //       label: `${index + 1}. ${value.name}|${value.address}`,
  //       value: value,
  //     }
  //   })
  // } else {
  //   selectionOptions = []
  // }
  const getSelectionOptions = (name: string) => {
    const data = savedData[name]
    if (data && data.length > 0) {
      return data.map((value, index) => {
        return {
          //@ts-ignore
          label: `${index + 1}. ${value.name}|${value.address}`,
          value: value,
        }
      })
    }
    return []
  }
  // console.log(selectionOptions)
  return (
    <>
      {!subtemplate && (
        // if the current user is not a user
        <>
          {currentUser.role !== "USER" && (
            <Modal
              size="70%"
              centered
              opened={opened}
              onClose={() => setOpened(false)}
              title={`Subtemplates - ${Template.name}`}
            >
              <Suspense
                fallback={
                  <div className="p-10 m-5 flex justify-center items-center">
                    <Loader color="cyan" variant="dots" size="lg" />
                  </div>
                }
              >
                <SubtemplateModal id={Template.id} currentUser={currentUser} />
              </Suspense>
            </Modal>
          )}
        </>
      )}
      <div className="flex flex-col justify-center items-center gap-4 w-[75%] md:w-full">
        <h2 className="text-2xl font-bold">{Template.name}</h2>
        <p className="text-lg">{Template.description}</p>
        {!subtemplate && (
          <>
            {currentUser.role !== "USER" && (
              <Button color="cyan" onClick={() => setOpened(true)}>
                View Subtemplates
              </Button>
            )}
          </>
        )}
        {payed || currentUser.role === "ADMIN" ? (
          <div className="flex flex-row justify-center items-center">
            <PDFButton Template={Template} editorHtml={editorHtml} subtemplate={subtemplate} />
          </div>
        ) : (
          <>
            {currentUser.role === "USER" && (
              <Button
                onClick={async () => {
                  await makePayment(
                    currentUser,
                    Template,
                    createTemplatepaymentMutation,
                    subtemplate
                  )
                }}
              >
                <>Purchase Now!</>
              </Button>
            )}
          </>
        )}
        <div className="p-5 rounded-lg flex flex-col md:flex-row gap-2 items-start justify-start md:w-[100vw]">
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 1000)
            }}
            render={(props) => {
              const {
                values,
                touched,
                errors,
                initialValues,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props
              return (
                <div className="flex flex-initial prose flex-col gap-4 justify-center items-start p-5">
                  <form
                    onSubmit={handleSubmit}
                    className="prose prose-md dark:prose-invert flex flex-col p-10 gap-4 items-start justify-start"
                  >
                    <h2 className="text-center">Input Fields Generated</h2>
                    {inputFields.map((inputField) => {
                      console.log(values[inputField.name])
                      return (
                        <div key={inputField.name}>
                          {inputField.type === "block" && subtemplate && (
                            <div className="bg-[#DAEAF1]/80 p-5 rounded-lg">
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                {inputField.name}
                              </label>
                              <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Names Saved In Main Template
                              </div>

                              <Field
                                name={inputField.name}
                                options={getSelectionOptions(inputField.name)}
                                component={CustomSelect}
                                placeholder="Select the names..."
                                isMulti={true}
                                content={Template.content}
                                reset={setEditorHtml}
                              />
                            </div>
                          )}
                          {inputField.type === "person" && (
                            <>
                              <FieldArray
                                name={inputField.name}
                                render={(arrayHelpers) => (
                                  <div
                                    key={inputField.name}
                                    className="gap-4 flex flex-col p-2 justify-center items-center"
                                  >
                                    {values[inputField.name] &&
                                      values[inputField.name].length == 0 && (
                                        <button type="button" onClick={() => arrayHelpers.push("")}>
                                          Add a {inputField.name}
                                        </button>
                                      )}
                                    {values[inputField.name] &&
                                      values[inputField.name].length > 0 &&
                                      values[inputField.name].map((value, index) => {
                                        return (
                                          <div className="flex flex-col gap-4" key={index}>
                                            <div className="flex flex-row gap-4 justify-start items-center">
                                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {inputField.name}
                                              </label>
                                              <div key={index} className="flex flex-row gap-2">
                                                <button
                                                  type="button"
                                                  className="rounded-lg bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                  onClick={() => {
                                                    arrayHelpers.remove(index)
                                                    setEditorHtml(Template.content)
                                                  }} // remove a friend from the list
                                                  disabled={values[inputField.name].length === 1}
                                                >
                                                  -
                                                </button>
                                                <button
                                                  type="button"
                                                  className="rounded-lg bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                  onClick={() => {
                                                    arrayHelpers.insert(index + 1, {})
                                                    setEditorHtml(Template.content)
                                                  }} // insert an empty string at a position
                                                >
                                                  +
                                                </button>
                                              </div>
                                            </div>
                                            <div className="pl-2 pt-2 flex flex-col gap-4 border-2 border-dashed">
                                              <div className="p-2 pr-3 flex flex-row gap-4">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                  {inputField.name} Name
                                                </label>
                                                <input
                                                  type="text"
                                                  value={values[inputField.name][index].name}
                                                  name={inputField.name + "." + index + ".name"}
                                                  onBlur={handleBlur}
                                                  onChange={(e) => {
                                                    handleChange(e)
                                                    setEditorHtml(Template.content)
                                                  }}
                                                  className="border border-slate-300 rounded-lg p-2 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:shadow-outline"
                                                  id={inputField.name}
                                                />
                                              </div>
                                              <div className="p-2 pr-3 flex flex-row gap-4">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                  {inputField.name} Address
                                                </label>
                                                <input
                                                  type="text"
                                                  value={values[inputField.name][index].address}
                                                  name={inputField.name + "." + index + ".address"}
                                                  onBlur={handleBlur}
                                                  onChange={(e) => {
                                                    handleChange(e)
                                                    setEditorHtml(Template.content)
                                                  }}
                                                  className="border border-slate-300 rounded-lg p-2 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:shadow-outline"
                                                  id={inputField.name}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })}
                                  </div>
                                )}
                              />
                              <Button
                                type="button"
                                color="teal"
                                variant="light"
                                onClick={() => {
                                  //save all the names and addresses to the database
                                  updateTemplateMutation({
                                    id: Template.id,
                                    name: Template.name,
                                    description: Template.description,
                                    total: Template.total,
                                    categoryId: Template.categoryId,
                                    content: Template.content,
                                    inputFields: Template.inputFields,
                                    visibility: Template.visibility,
                                    // savedData: JSON.stringify(values[inputField.name]),
                                    savedData: JSON.stringify({
                                      [inputField.name]: values[inputField.name],
                                    }),
                                  }).then(() => {
                                    showNotification({
                                      title: "Success",
                                      message:
                                        "Names and addresses saved successfully. The values stored can be accessed in the subtemplates.",
                                    })
                                  })
                                }}
                              >
                                Save Data For Sub Template
                              </Button>
                            </>
                          )}
                          {inputField.type === "file" && (
                            <>
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-gray-200">
                                {inputField.name}
                              </label>
                              <input
                                type={inputField.type}
                                value={values[inputField.name]}
                                accept="image/*"
                                name={inputField.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className="file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-700
                                  hover:file:bg-blue-100
                                  dark:file:bg-slate-700 dark:hover:file:bg-slate-800
                                  dark:file:text-blue-200 transition-colors duration-200 ease-in-out"
                                id={inputField.name}
                              />
                            </>
                          )}
                          {inputField.type !== "file" &&
                            inputField.type !== "person" &&
                            inputField.type !== "block" && (
                              <>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-gray-200">
                                  {inputField.name}
                                </label>
                                <div
                                  key={inputField.name}
                                  className="gap-4 flex flex-col p-2 justify-center items-center"
                                >
                                  <input
                                    type={inputField.type}
                                    value={values[inputField.name]}
                                    name={inputField.name}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                      handleChange(e)
                                      if (currentUser.role === "ADMIN") {
                                        if (adminvalue === "content") {
                                          setEditorHtml(Template.content)
                                        } else {
                                          setEditorHtml(Template.placeholder)
                                        }
                                      } else if (payed) setEditorHtml(Template.content)
                                      else setEditorHtml(Template.placeholder)
                                    }}
                                    className="caret-blue-500 border border-slate-300 focus:border-blue-500 rounded-lg p-2 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:shadow-outline"
                                    id={inputField.name}
                                  />
                                </div>
                              </>
                            )}
                        </div>
                      )
                    })}
                    <button
                      onClick={() => {
                        // console.log(props)
                        renderName(props)
                      }}
                      type="submit"
                      className="py-2 px-4 text-white  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 p-white w-full transition ease-in duration-200 p-center p-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                    >
                      Submit
                    </button>
                    {/* Reset Button */}
                    <button
                      onClick={() => {
                        // reset the editor
                        setEditorHtml(Template.content)
                        // reset the form
                        props.resetForm()
                      }}
                      className="py-2 px-4 text-white  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 p-white w-full transition ease-in duration-200 p-center p-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                    >
                      Reset
                    </button>
                    {/* <div className="rounded-xl p-2">
                          {JSON.stringify(props.values, null, 2)}
                        </div> */}
                  </form>
                </div>
              )
            }}
          />
          <div className="flex flex-col items-center justify-center prose prose-md dark:prose-invert w-full">
            <h2 className="text-center">Preview</h2>
            {currentUser.role === "ADMIN" && (
              <SegmentedControl
                value={adminvalue}
                color="blue"
                onChange={(e) => {
                  // console.log(e)
                  setadminvalue(e)
                  if (e === "content") {
                    setEditorHtml(Template.content)
                  }
                  if (e === "placeholder") {
                    setEditorHtml(Template.placeholder)
                  }
                }}
                data={[
                  { label: "Content", value: "content" },
                  { label: "Placeholder", value: "placeholder" },
                ]}
              />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: editorHtml }}
              className="p-5 rounded-xl w-full"
            />
          </div>
        </div>
      </div>
    </>
  )
}
