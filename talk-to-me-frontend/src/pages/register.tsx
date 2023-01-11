import * as React from "react"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import axiosInstance from "@/xhr/axiosInstance"
import { isLoggedIn, setAuthTokens } from "axios-jwt"
import { setUser } from "@/features/auth/services/user.service"

export default function Page() {
  const handleSubmit = async (e: any) => {
    const values = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirm_password: e.target.confirm_password.value,
    }

    const { data } = await axiosInstance.post(`/users/`, values)

    if (!data) return;

    const response = await axiosInstance.post("/token/", {
      email: data.email,
      password: values.password,
    })

    // save tokens to storage
    setAuthTokens({
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
    })

    const userResponse = await axiosInstance.get("/users/get_current_user/")

    setUser(userResponse.data)

    if (isLoggedIn()) {
      window.location.href = "/"
    }
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="trein">
        <div className="loginform">
          <h1>Registreer</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}>
            <label className="voornaam">Voornaam</label>
            <input className="voornaam2 w-100" name="first_name" />

            <label className="voornaam">Achternaam</label>
            <input className="voornaam2 w-100" name="last_name" />

            <label className="voornaam">E-mailadres</label>
            <input className="voornaam2 w-100" name="email" />

            <label className="voornaam">Wachtwoord</label>
            <input className="voornaam2 w-100" name="password" type="password" />

            <label className="voornaam">Herhaal wachtwoord</label>
            <input className="voornaam2 w-100" name="confirm_password" type="password" />

            <input className="login w-100 pointer" type="submit" value="Creëer account" />
          </form>
          <a href="/login">
            Heb je al een account? Log hier in.
          </a>
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