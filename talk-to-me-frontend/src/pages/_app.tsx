import type { AppProps } from "next/app"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"
import '../styles.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: any) => page)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default MyApp