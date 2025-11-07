import Link from "next/link"
import Image from "next/image"
import { useMutation } from "@blitzjs/rpc"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/validations"
import { Field, ErrorMessage } from "formik"
import GoogleLogo from "src/assets/img/google.svg"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

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
                  <div className="text-center mb-3">
                    <h6 className="text-gray-600 text-sm font-bold">Continue with</h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Link href="/api/auth/google" passHref>
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <Image alt="..." className="w-5 mr-1" src={GoogleLogo} width="50" />
                        Google
                      </button>
                    </Link>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-gray-800 text-center mb-3 font-bold">
                    <small>Or sign up with credentials</small>
                  </div>
                  <Form
                    schema={Signup}
                    initialValues={{ email: "", password: "", role: "USER" }}
                    onSubmit={async (values) => {
                      // console.log(values)
                      try {
                        await signupMutation(values)
                        props.onSuccess?.()
                      } catch (error: any) {
                        // console.log(error)
                        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                          // This error comes from Prisma
                          return { email: "This email is already being used" }
                        } else {
                          return { [FORM_ERROR]: error.toString() }
                        }
                      }
                    }}
                  >
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        className="rounded-lg border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        name="email"
                        style={{ transition: "all .15s ease" }}
                      />
                      <ErrorMessage name={"email"}>
                        {(msg) => (
                          <div role="alert" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        className="rounded-lg border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style={{ transition: "all .15s ease" }}
                      />
                      <ErrorMessage name={"password"}>
                        {(msg) => (
                          <div role="alert" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
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
                      <ErrorMessage name={"role"}>
                        {(msg) => (
                          <div role="alert" style={{ color: "red" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="rounded-lg bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{ transition: "all .15s ease" }}
                      >
                        Sign Up
                      </button>
                    </div>
                  </Form>
                  <div className="pt-5">
                    <Link href="/login">
                      <a className="text-center text-gray-800 text-md mt-6">
                        Already Have An Account? Sign in
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignupForm
