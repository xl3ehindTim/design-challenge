import React, { useCallback } from "react"
// @ts-ignore
import { isLoggedIn, setAuthTokens } from "axios-jwt"
import { FieldValues, useForm } from "react-hook-form"
import axiosInstance from "@/xhr/axiosInstance"
import { setUser } from "../services/user.service"
import { useRouter } from "next/router"
import { InputField } from "@/components/Form/InputField"
import { PasswordField } from "@/components/Form/PasswordField"
import Link from "next/link"

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
      <InputField
        label="Email Adres"
        placeholder="Email Adres"
        control={control}
        error={errors.email}
        {...register("email")}
      />

      <PasswordField
        label="Password"
        placeholder="Password"
        control={control}
        error={errors.password}
        {...register("password")}
      />

      <div style={{ fontSize: 14, marginLeft: 0.6 }}>
        <Link href="/register">
          Don't have an account? Register now!
        </Link>
      </div>

      <button
        type="submit"
        className="buttonlogin"
        style={{ height: 35, cursor: 'pointer' }}
      >
        Login Now
      </button>
    </form>
  )
}