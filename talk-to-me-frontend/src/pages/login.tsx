import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import trein from "../assets/img/trein.jpg"

export default function Page() {
  return (
    <AppLayout>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="loginform">
      <p className="text-center text-lg">Log in</p>
      <LoginForm />
      </div>
      
    </AppLayout>
  )
}