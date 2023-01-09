import * as React from "react"
import RegisterForm from "@/features/auth/components/RegisterForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import { fontSize } from "@mui/system"

export default function Page() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="trein">
       <div className="loginform">
      <h5 className="text-center text-lg">Registreer</h5>
      <RegisterForm />
      </div>
      </div>

    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}