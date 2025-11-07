import { withBlitz } from "src/blitz-client"
import "styles/admin-styles.css"
import "styles/preflight.css"
import "styles/tailwind.css"
import "node_modules/nprogress/nprogress.css"
import "node_modules/wowjs/css/libs/animate.css"
import { AuthenticationError, AuthorizationError } from "blitz"
import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import Head from "next/head"
import { useState, useEffect, Suspense } from "react"
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core"
import NProgress from "nprogress"
import { useRouter } from "next/router"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import { QueryClientProvider } from "@blitzjs/rpc"

export default withBlitz(function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
  const router = useRouter()
  useEffect(() => {
    const handleStart = (url) => {
      // console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1,viewport-fit=cover" />
        <link rel="icon" href="/law.svg" />
      </Head>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }}>
            <NotificationsProvider>
              <ModalsProvider>
                <QueryClientProvider client={globalThis.queryClient}>
                  <Suspense fallback="Loading...">
                    <div className="w-full h-full">{getLayout(<Component {...pageProps} />)}</div>
                  </Suspense>
                </QueryClientProvider>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ErrorBoundary>
    </>
  )
})

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}
