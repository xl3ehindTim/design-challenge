import * as React from "react"
import RegisterForm from "@/features/auth/components/RegisterForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"

export default function Page() {
  return (
    <AppLayout>
      <Head>
        <title>Register</title>
      </Head>

      <h5>Register</h5>
      <RegisterForm />
    </AppLayout>
  )
}