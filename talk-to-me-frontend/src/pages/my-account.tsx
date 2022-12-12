import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"

export default function Page() {
  return (
    <AppLayout>
      <Head>
        <title>My account</title>
      </Head>
    </AppLayout>
  )
}