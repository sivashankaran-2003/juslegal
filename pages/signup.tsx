import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { SignupForm } from "src/auth/components/SignupForm"

const SignupPage = () => {
  const router = useRouter()
  return (
    <div>
      <SignupForm onSuccess={() => router.push("/admin")} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/admin"

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
