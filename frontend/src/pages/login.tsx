import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import Grid from "@mui/material/Grid"
import { Button, Typography } from "@mui/material"

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={4}>
          <Typography>Login</Typography>
        </Grid>
        <Grid item xs={12} sx={{ background: "#fff", p: 4, minWidth: 480 }}>
          <LoginForm />
        </Grid>
      </Grid>
    </>
  )
}