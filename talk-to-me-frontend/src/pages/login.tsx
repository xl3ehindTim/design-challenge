import * as React from "react"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import axiosInstance from "@/xhr/axiosInstance"
import { isLoggedIn, setAuthTokens } from "axios-jwt"
import { setUser } from "@/features/auth/services/user.service"

export default function Page() {
  const handleSubmit = async (e: any) => {
    const response = await axiosInstance.post("/token/", {
      email: e.target.email.value,
      password: e.target.password.value,
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
          <h1>Inloggen</h1>
          <form onSubmit={(e) => {
            e.preventDefault() // Prevent default form action
            handleSubmit(e) // Function to handle login
          }}>
            <label className="email">E-mailadres</label>
            <input className="username w-100" name="email" />

            <label className="wachtwoord">Wachtwoord</label>
            <input className="password w-100" name="password" type="password" />

            <input className="login w-100 pointer" type="submit" value="Login" />
          </form>

          <a href="/register">
            Heb je nog geen account? Registreer nu!
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