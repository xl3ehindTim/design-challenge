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
          <h1>Registreer</h1>
          <form>
            <label className="voornaam">Voornaam</label>
            <input className="voornaam2 w-100" name="username" />

            <label className="voornaam">Achternaam</label>
            <input className="voornaam2 w-100" name="username" />

            <label className="voornaam">E-mailadres</label>
            <input className="voornaam2 w-100" name="username" />

            <label className="voornaam">Wachtwoord</label>
            <input className="voornaam2 w-100" name="password" type="password" />

            <label className="voornaam">Herhaal wachtwoord</label>
            <input className="voornaam2 w-100" name="password" type="password" />

            <input className="login w-100 pointer" type="submit" value={'creëer account'} />
          </form>
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