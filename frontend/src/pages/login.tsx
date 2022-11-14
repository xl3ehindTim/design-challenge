import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import Grid from "@mui/material/Grid"
import { Typography } from "@mui/material"
import AppLayout from "@/features/layout/AppLayout"

export default function Page() {
  return (
    <AppLayout>
      <Head>
        <title>Sign in</title>
      </Head>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingTop: 30 }}
      >
        <Grid item xs={4}>
          <Typography variant='h5'>Login</Typography>
        </Grid>
        <Grid item xs={12} sx={{ background: "#fff", p: 4, minWidth: 480 }}>
          <LoginForm />
        </Grid>
      </Grid>
    </AppLayout>
  )
}