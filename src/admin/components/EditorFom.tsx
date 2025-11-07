//@ts-nocheck
import { useMutation } from "@blitzjs/rpc"
import { Formik } from "formik"
import createTemplate from "src/admin/mutations/createTemplate"
import { Button, Group, MultiSelect, Text } from "@mantine/core"
import createCategory from "src/admin/mutations/createCategory"
import React, { forwardRef, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import getCategories from "src/admin/queries/getCategories"
import { Editor as TEditor } from "@tinymce/tinymce-react"
import updateTemplate from "src/admin/mutations/updateTemplate"
import createSubtemplate from "src/subtemplates/mutations/createSubtemplate"
import updateSubtemplate from "src/subtemplates/mutations/updateSubtemplate"
import { showNotification } from "@mantine/notifications"
import { CompleteCategory } from "db/zod"
import deleteCategory from "../mutations/deleteCategory"
import { useModals } from "@mantine/modals"

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string
  label: string
  description: string
}

function DeleteModal({ label }) {
  const modals = useModals()
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete Category",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the category? This action is destructive and cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Delete Category", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteCategory({ name: label }).then(() => {
          window.location.reload()
          showNotification({
            title: "Category deleted",
            message: `The Category ${label} has been deleted`,
          })
        })
      },
    })
  return (
    <Button
      size="xs"
      variant="outline"
      color="red"
      onClick={async () => {
        openDeleteModal()
      }}
    >
      Delete
    </Button>
  )
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <>
      <div className="flex flex-row justify-between align-center">
        <div ref={ref} {...others}>
          <Group noWrap>
            <div>
              <Text size="sm">{label}</Text>
              <Text size="xs" color="dimmed">
                {description}
              </Text>
            </div>
          </Group>
        </div>
        <DeleteModal label={label} />
      </div>
    </>
  )
)

export default function Editor({
  categories = [],
  Template = {},
  initCategory = [],
  subtemplate = false,
  Subtemplate = {},
}) {
  if (!subtemplate) {
    categories = categories.map((category) => {
      return {
        label: category.name,
        value: category.name,
      }
    })
  }
  const [category, setCategory] = React.useState(categories)

  const [createCategoryMutation] = useMutation(createCategory)
  const [updateTemplateMutation] = useMutation(updateTemplate)

  async function refreshCategories() {
    const categories: CompleteCategory[] = await getCategories()
    setCategory(
      categories.map((category) => {
        return {
          label: category.name,
          value: category.name,
        }
      })
    )
  }

  const [editorHtml, setEditorHtml] = React.useState(
    Template.content && !subtemplate
      ? Template.content
      : Subtemplate.content
      ? Subtemplate.content
      : ""
  )
  const [inputFields, setInputFields] = React.useState(
    Template.inputFields && !subtemplate
      ? JSON.parse(Template.inputFields)
      : Subtemplate.inputFields
      ? JSON.parse(Subtemplate.inputFields)
      : []
  )
  const [submitted, setSubmitted] = React.useState(true)
  const [createTemplateMutation] = useMutation(createTemplate)
  const router = useRouter()
  const [unrenderedHtml, setUnrenderedHtml] = React.useState(
    Template.total && !subtemplate ? Template.total : Subtemplate.total ? Subtemplate.total : ""
  )

  function handleChange(html: string) {
    //reset input fields
    setUnrenderedHtml(html)
    setEditorHtml(html)
    setInputFields([])
    //console.log(html)
    var regex = /\{(.*?)\}/g
    var matches = html.match(regex)
    if (matches) {
      //console.log(matches)
      //find json data in the form {type|name} in html
      //and return the name of the input field
      //and the type of the input field
      var inputFields = []
      for (var i = 0; i < matches.length; i++) {
        var match = matches[i]
        //check if the match is the form {name1|name2} using regex
        if (match.match(/\{.*?\|.*?\}/g) == null) continue
        var matchArray = match.split("|")
        var type = matchArray[0].replace("{", "").trim()
        var name = matchArray[1].replace("}", "").trim()
        //save the index of the input field
        var index = html.indexOf(match)
        //remove any html tags and all elements inside the tags
        name = name.replace(/(<([^>]+)>)/gi, "")
        //save the input field
        var inputField = {
          type: type,
          name: name,
          index: index,
        }
        inputFields.push(inputField)
        //replace the json with {props.values.Address || "..."}
        html = html.replace(match, `{${name}}`)
        // set the state of the editor
        // this.setState({ editorHtml: html });
        setEditorHtml(html)
      }
      //console.log(inputFields)
      // this.setState({ inputFields: inputFields });
      setInputFields(inputFields)
    }
  }
  const [createSubtemplateMutation] = useMutation(createSubtemplate)
  const [updateSubTemplateMutation] = useMutation(updateSubtemplate)
  const saveTemplate = async (values: {
    name: string
    description: string
    visibility: string
    editorHtml: string
  }) => {
    //save the template to the database
    const { name, description, visibility } = values
    // If Template.id is not null, then it is an update
    if (subtemplate) {
      if (Subtemplate.id) {
        await updateSubTemplateMutation({
          id: Subtemplate.id,
          name: name,
          description: description,
          content: editorHtml,
          inputFields: JSON.stringify(inputFields),
          total: unrenderedHtml,
          templateId: Subtemplate.templateId,
        }).then(() => {
          setSubmitted(true)
          showNotification({
            title: "Success",
            message: "Subtemplate Updated Successfully",
          })
          router.push(
            "/admin/subtemplates/[subtemplateId]",
            `/admin/subtemplates/${Subtemplate.id}`
          )
        })
      } else {
        await createSubtemplateMutation({
          name: name,
          description: description,
          content: editorHtml,
          inputFields: JSON.stringify(inputFields),
          total: unrenderedHtml,
          templateId: Template.id,
        }).then((SubTemplate) => {
          setSubmitted(true)
          showNotification({
            title: "Success",
            message: "Subtemplate Created Successfully",
          })
          router.push(
            "/admin/subtemplates/[subtemplateId]",
            `/admin/subtemplates/${SubTemplate.id}`
          )
        })
      }
    } else {
      if (Template.id) {
        await updateTemplateMutation({
          id: Template.id,
          name,
          description,
          total: unrenderedHtml,
          categories: cvalue,
          content: editorHtml,
          inputFields: JSON.stringify(inputFields),
          visibility,
        })
          .then(() => {
            setSubmitted(true)
            showNotification({
              title: "Success",
              message: "Template Updated Successfully",
            })
          })
          .then(() => {
            router.push("/admin")
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        await createTemplateMutation({
          name,
          description,
          total: unrenderedHtml,
          content: editorHtml,
          categories: cvalue,
          inputFields: JSON.stringify(inputFields),
          visibility,
        })
          .then(() => {
            setSubmitted(true)
            showNotification({
              title: "Success",
              message: "Template Created Successfully",
            })
          })
          .then(() => {
            router.push("/admin")
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
  const [cvalue, setcValue] = useState(initCategory ?? "")
  console.log(cvalue)
  const editorRef = useRef(null)
  const [dirty, setDirty] = useState(false)
  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      setDirty(false)
      editorRef.current.setDirty(false)
      // an application would save the editor content to the server here
      handleChange(content)
      // console.log(content)
    }
  }
  const [dvalue, setdValue] = useState(
    Template.total && !subtemplate ? Template.total : Subtemplate.total ? Subtemplate.total : ""
  )
  useEffect(() => {
    if (subtemplate) {
      //if dvalue is empty
      if (dvalue === "") {
        setdValue("{block|data}")
      }
    } else {
      //if dvalue is empty
      if (dvalue === "") {
        setdValue("{person|data}")
      }
    }
  }, [])
  console.log(cvalue)
  return (
    <div className="w-full h-full">
      <div className="text-editor w-full">
        {/* Add Name and Decription Fields */}
        <Formik
          initialValues={{
            name:
              Template.name && !subtemplate
                ? Template.name
                : Subtemplate.name
                ? Subtemplate.name
                : "",
            description:
              Template.description && !subtemplate
                ? Template.description
                : Subtemplate.description
                ? Subtemplate.description
                : "",
            visibility:
              Template.visibility && !subtemplate
                ? Template.visibility
                : Subtemplate.visibility
                ? Subtemplate.visibility
                : "USER",
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    className="shadow dark:bg-slate-700 dark:text-gray-200 transition-colors duration-200 ease-in-out appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                  />
                </div>
                <div className="pt-2 flex flex-col">
                  <label className="text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                    Description
                  </label>
                  <textarea
                    className="shadow dark:bg-slate-700 dark:text-gray-200 transition-colors duration-200 ease-in-out appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                  />
                </div>
                {/* Create a visibility selector between the modes USER and LAWYER */}
                <div className="pt-2 flex flex-col gap-2">
                  {!subtemplate && (
                    <>
                      <label className="text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                        Visibility
                      </label>
                      <select
                        className="shadow accent-emerald-500 dark:bg-slate-700 dark:text-gray-200 transition-colors duration-200 ease-in-out appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="visibility"
                        onChange={handleChange}
                        value={values.visibility}
                      >
                        <option value="USER">USER</option>
                        <option value="LAWYER">LAWYER</option>
                        <option value="ALL">ALL</option>
                      </select>
                      <MultiSelect
                        label={"Category"}
                        name="categories"
                        className="pt-2"
                        searchable
                        clearable
                        creatable
                        itemComponent={SelectItem}
                        value={cvalue?.map((item) => {
                          return item.name
                        })}
                        getCreateLabel={(query) => `+ Create ${query}`}
                        data={category}
                        onChange={(value) => {
                          setcValue(value.map((item) => ({ name: item })))
                        }}
                        placeholder={"Select Category"}
                        onCreate={(value) => {
                          //create a new category
                          createCategoryMutation({
                            name: value,
                          }).then(() => {
                            //refetch the categories
                            refreshCategories()
                          })
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              {/* Add a save button that saves the contents of the ReactQuill to the database */}
              <div className="p-5 flex justify-center items-center">
                <button
                  // disabled={!submitted}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    // console.log("Selected Category", cvalue)
                    const { name, description, visibility } = values
                    //console.log(name, description, visibility, editorHtml);
                    saveTemplate({ name, description, visibility, editorHtml })
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="p-5" />
        <div className="h-full w-full">
          <TEditor
            id="editor"
            init={{
              toolbar_sticky: true,
              menubar: "edit view insert format tools table",
              save_onsavecallback: save,
              autosave_interval: "20s",
              toolbar_mode: "sliding",
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              toolbar:
                "restoredraft save | undo redo | bold italic underline strikethrough | fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen | insertfile image media link anchor codesample",
              branding: false,
              autosave_restore_when_empty: true,
              plugins:
                "importcss autosave searchreplace autolink directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons save",
            }}
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            initialValue={dvalue}
            onInit={(evt, editor) => (editorRef.current = editor)}
            onDirty={() => setDirty(true)}
          />
          {/* <button onClick={save}>Save</button> */}
        </div>
        <div className="p-5 rounded-lg flex md:flex-row flex-col gap-2 items-start justify-center w-full">
          <Formik
            initialValues={{ name: "" }}
            onSubmit={(values, { setSubmitting }) => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false)
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
                <div className="flex prose flex-col gap-4 justify-center items-center md:p-5 md:w-1/2 w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="prose prose-md dark:prose-invert flex flex-col p-10 gap-4 items-start justify-start"
                  >
                    <h2 className="text-center">Input Fields Generated</h2>
                    {inputFields.map((inputField) => {
                      return (
                        <div
                          key={inputField.name}
                          className="gap-4 flex flex-row p-2 justify-center items-center"
                        >
                          {inputField.type === "person" && (
                            <div className="flex flex-col gap-4">
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                {inputField.name}
                              </label>
                              <div className="pl-2 pt-2 flex flex-col gap-4 border-2 border-dashed">
                                <div className="p-2 pr-3 flex flex-row gap-4">
                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {inputField.name} Name
                                  </label>
                                  <input
                                    type="text"
                                    // disabled
                                    value={values[inputField.name]}
                                    name={inputField.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
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
                                    // disabled
                                    value={values[inputField.name]}
                                    name={inputField.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className="border border-slate-300 rounded-lg p-2 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:shadow-outline"
                                    id={inputField.name}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          {inputField.type === "file" && (
                            <>
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                {inputField.name}
                              </label>
                              <input
                                type={inputField.type}
                                value={values[inputField.name]}
                                accept="image/*"
                                // disabled
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
                          {inputField.type !== "person" && inputField.type !== "file" && (
                            <>
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                {inputField.name}
                              </label>
                              <input
                                type={inputField.type}
                                // disabled
                                value={values[inputField.name]}
                                name={inputField.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-lg p-2 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-none focus:shadow-outline"
                                id={inputField.name}
                              />
                            </>
                          )}
                        </div>
                      )
                    })}
                  </form>
                </div>
              )
            }}
          />
          <div className="md:w-1/2 w-full">
            <div className="prose prose-md dark:prose-invert">
              <h2 className="text-center">Preview</h2>
              {/* Render the html string in editorHTML with the props in formik */}
              <div dangerouslySetInnerHTML={{ __html: editorHtml }} className="p-5 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
