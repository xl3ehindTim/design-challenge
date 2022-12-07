import React, { useCallback } from "react"
// @ts-ignore
import { isLoggedIn, setAuthTokens } from "axios-jwt"
import { FieldValues, useForm } from "react-hook-form"
import axiosInstance from "@/xhr/axiosInstance"
import { setUser } from "../services/user.service"
import { useRouter } from "next/router"
import { InputField } from "@/components/Form/InputField"
import { PasswordField } from "@/components/Form/PasswordField"
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
      <InputField
        isRequired
        label="Voornaam"
        placeholder="Voornaam"
        error={errors.first_name}
        control={control}
        {...register("first_name", { required: true })}
      />

      <InputField
        isRequired
        label="Achternaam"
        placeholder="Achternaam"
        error={errors.last_name}
        control={control}
        {...register("last_name", { required: true })}
      />

      <InputField
        isRequired
        label="E-mailadres"
        placeholder="E-mailadres"
        error={errors.email}
        control={control}
        {...register("email", { required: true })}
      />

      <PasswordField
        isRequired
        type="password"
        placeholder="Wachtwoord"
        label="Wachtwoord"
        error={errors.email}
        control={control}
        {...register("password", { required: true })}
      />

      <PasswordField
        isRequired
        type="password"
        placeholder="Wachtwoord (nogmaals)"
        label="Wachtwoord (nogmaals)"
        error={errors.email}
        control={control}
        {...register("confirm_password", { required: true })}
      />

      <CheckboxField
        label="I agree with the Terms and Conditions and the Privacy Policy"
        control={control}
        error={errors.is_active}
        {...register("is_active")}
      />

      <div style={{ marginTop: 2 }}>
        <button
          type="submit"
          style={{ float: "right", height: 35 }}
        >
          Create Account
        </button>
      </div>
    </form>
  )
}