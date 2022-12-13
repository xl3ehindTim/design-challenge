import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"

export default function Page() {
  return (
    <AppLayout>
      <Head>
        <title>Sign in</title>
      </Head>

      <p>Login</p>
      <LoginForm />
    </AppLayout>
  )
}