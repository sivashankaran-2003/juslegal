import { Field, Formik } from "formik"
import updateUserRole from "src/auth/mutations/updateUserRole"

function CompleteSetup({ currentUser }) {
  return (
    <main className="h-[100vh] w-[100vw]">
      <section className="absolute w-full h-full">
        <div
          className="absolute top-0 w-full h-full bg-gray-900"
          style={{
            //get the image from assests background.jpg
            backgroundImage: `url("/background.jpg")`,
            backgroundSize: "100%",
            // make the background fit the screen
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="container mx-auto px-4 h-full shadow-xl">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300/80 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3 gap-4">
                    <h6 className="text-gray-900 text-lg font-extrabold">Set Your Role</h6>
                    <p className="text-gray-600 text-md">Set Your Role as a User or as a Lawyer</p>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <Formik
                    initialValues={{
                      role: currentUser.role,
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                      //@ts-ignore
                      await updateUserRole({ id: currentUser.id, role: values.role })
                      setSubmitting(false)
                      // reload the page
                      window.location.reload()
                    }}
                    render={({ isSubmitting, values, handleSubmit, handleChange }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Role
                          </label>
                          <Field
                            as="select"
                            name="role"
                            className="rounded-lg border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white text-sm shadow focus:outline-none focus:ring w-full"
                          >
                            <option value="USER">USER</option>
                            <option value="LAWYER">LAWYER</option>
                          </Field>
                        </div>
                        <div className="text-center mt-6">
                          <button
                            className="rounded-lg bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="submit"
                            style={{ transition: "all .15s ease" }}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CompleteSetup
