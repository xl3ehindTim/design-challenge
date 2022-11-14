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
import { CheckboxField } from "@/components/Form/CheckboxField"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  is_active: yup
    .bool()
    .oneOf([true], 'You need to accept the terms and conditions'),
});

export default function RegisterForm() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onCreate = async (values: FieldValues) => {
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

  const onFinish = async (values: FieldValues) => {
    const { data } = await axiosInstance.post(`/users/`, values)

    if (data) {
      onCreate({ ...data, password: values.password })
    }
  }

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <Grid container direction="column" spacing="4">
        <Grid item>
          <InputField
            isRequired
            label="Voornaam"
            placeholder="Voornaam"
            error={errors.first_name}
            control={control}
            {...register("first_name", { required: true })}
          />
        </Grid>

        <Grid item>
          <InputField
            isRequired
            label="Achternaam"
            placeholder="Achternaam"
            error={errors.last_name}
            control={control}
            {...register("last_name", { required: true })}
          />
        </Grid>

        <Grid item>
          <InputField
            isRequired
            label="E-mailadres"
            placeholder="E-mailadres"
            error={errors.email}
            control={control}
            {...register("email", { required: true })}
          />
        </Grid>

        <Grid item>
          <PasswordField
            isRequired
            type="password"
            placeholder="Wachtwoord"
            label="Wachtwoord"
            error={errors.email}
            control={control}
            {...register("password", { required: true })}
          />
        </Grid>

        <Grid item>
          <PasswordField
            isRequired
            type="password"
            placeholder="Wachtwoord (nogmaals)"
            label="Wachtwoord (nogmaals)"
            error={errors.email}
            control={control}
            {...register("confirm_password", { required: true })}
          />
        </Grid>

        <Grid item>
          <CheckboxField
            label="I agree with the Terms and Conditions and the Privacy Policy"
            control={control}
            error={errors.is_active}
            {...register("is_active")}
          />
        </Grid>

        <Grid item sx={{ marginTop: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ float: "right", height: 35 }}
          >
            Create Account
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}