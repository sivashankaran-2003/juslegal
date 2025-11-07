import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { ResetPassword } from "src/auth/validations"
import resetPassword from "src/auth/mutations/resetPassword"
import { useRouter } from "next/router"

const ResetPasswordPage = () => {
  const query = useRouter().query
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)
  return (
    <div>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the{" "}
            <Link href={Routes.AdminHomePage()}>
              <a>Admin Page</a>
            </Link>
          </p>
        </div>
      ) : (
        <Form
          submitText="Reset Password"
          schema={ResetPassword}
          initialValues={{
            password: "",
            passwordConfirmation: "",
            token: query.token as string,
          }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
            } catch (error) {
              if (error.name === "ResetPasswordError") {
                return {
                  [FORM_ERROR]: error.message,
                }
              } else {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                }
              }
            }
          }}
        >
          <LabeledTextField name="password" label="New Password" type="password" />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
          />
        </Form>
      )}
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/admin"

ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
