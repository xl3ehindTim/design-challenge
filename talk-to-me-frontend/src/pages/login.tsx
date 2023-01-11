import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="trein">
        <div className="loginform">
          <h1>Inloggen</h1>
          <form>
            <label className="gebruikersnaam">Gebruikersnaam</label>
            <input className="username w-100" name="username" />

            <label className="wachtwoord">Wachtwoord</label>
            <input className="password w-100" name="password" type="password" />

            <input className="login w-100 pointer" type="submit" value={'login'} />
          </form>
        </div>
      </div>

      {/* <div className="trein">
        <div className="loginform">
          <p className="text-center text-lg">Login</p>
          <LoginForm />
        </div>
      </div> */}
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