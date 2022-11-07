import React, { useCallback } from "react"
// @ts-ignore
import { isLoggedIn, setAuthTokens } from "axios-jwt"
import { FieldValues, useForm } from "react-hook-form"
import axiosInstance from "@/xhr/axiosInstance"
import { setUser } from "../services/user.service"
import { useRouter } from "next/router"
import { InputField } from "@/components/Form/InputField"
import { PasswordField } from "@/components/Form/PasswordField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"

export default function LoginForm() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isSubmitting },
  } = useForm()

  const onFinish = async (values: FieldValues) => {
    const response = await axiosInstance.post("/token/", {
      email: values.email,
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
    <form onSubmit={handleSubmit(onFinish)}>
      <Grid container direction="column" spacing="4">
        <Grid item>
          <InputField
            label="Email Address"
            placeholder="Email Address"
            control={control}
            error={errors.email}
            {...register("email")}
          />
        </Grid>

        <Grid item>
          <PasswordField
            label="Password"
            placeholder="Password"
            control={control}
            error={errors.password}
            {...register("password")}
          />
        </Grid>

        <Grid item sx={{ marginTop: 4 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ float: "right", height: 35 }}
          >
            Login Now
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}