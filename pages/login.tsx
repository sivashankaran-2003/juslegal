import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { LoginForm } from "src/auth/components/LoginForm"

const LoginPage = () => {
  const router = useRouter()
  return (
    <div>
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next
            ? decodeURIComponent(router.query.next as string)
            : "/admin"
          router.push(next)
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/admin"

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
