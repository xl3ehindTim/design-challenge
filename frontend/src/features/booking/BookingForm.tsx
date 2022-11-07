import React, { useCallback, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import axiosInstance from "@/xhr/axiosInstance"
import { InputField } from "@/components/Form/InputField"
import { Grid } from "@mui/material"
import { AsyncSelectField } from "@/components/Form/AsyncSelectField"

export interface IStation {
  id: string;
  name: string;
  beneCode: string;
}

export default function BookingForm() {
  const router = useRouter()


  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const doSave = (values: any) => {
    const fromStation = values.fromStation.value;
    const toStation = values.toStation.value;

    router.push(`/search/${fromStation}-${toStation}`)
  }

  // const doSave = useCallback(
  //   (values: any) => {
  //     const fromStation = values.fromStation;
  //     const toStation = values.toStation;

  //     router.push(`/search/${fromStation}/${toStation}`)
  //   },
  //   []
  // )

  const fetchStations = useCallback(async (query: string) => {
    const { data } = await axiosInstance.get("/stations/", {
      params: {
        query
      }
    })

    return data.results.map((x: IStation) => ({
      label: x.name,
      value: x.beneCode,
    }))
  }, [])

  return (
    <form onSubmit={handleSubmit(doSave)}>
      <Grid container direction="column" spacing={1}>

        <Grid item>
          <AsyncSelectField
            label="From"
            control={control}
            error={errors.fromStation}
            isSearchable
            isClearable
            loadOptions={fetchStations}
            {...register("fromStation")}
          />
        </Grid>

        <Grid item>
          <AsyncSelectField
            label="To"
            control={control}
            error={errors.toStation}
            isSearchable
            isClearable
            loadOptions={fetchStations}
            {...register("toStation")}
          />
        </Grid>

        <Grid item>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}