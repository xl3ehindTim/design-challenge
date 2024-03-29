import React, { useCallback, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import axiosInstance from "@/xhr/axiosInstance"
import { Box, Grid, Typography } from "@mui/material"
import { AsyncSelectField } from "@/components/Form/AsyncSelectField"
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { DateField } from "@/components/Form/DateField"
import moment from "moment"

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
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      departureDate: moment().format('YYYY-MM-DD')
    }
  })

  const doSave = (values: any) => {
    const fromStation = values.fromStation.value;
    const toStation = values.toStation.value;

    router.push(`/search/${fromStation}-${toStation}?date=${values.departureDate}`)
  }

  const handleSwap = () => {
    const fromStation = getValues('fromStation')
    const toStation = getValues('toStation')

    setValue('fromStation', toStation)
    setValue('toStation', fromStation)
  }

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
      <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
        <Grid item xs={5}>
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
          <Box sx={{ marginTop: 2, cursor: 'pointer' }} onClick={handleSwap}>
            <SwapHorizIcon />
          </Box>
        </Grid>
        <Grid item xs={5}>
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
      </Grid>

      <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
        <Grid item xs={5}>
          <DateField
            label="Vertrekdatum"
            control={control}
            error={errors.departureDate}
            name="departureDate"
          />
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item sx={{ marginTop: 1 }}>
          <Button size="medium" variant="contained" type="submit">
            <Typography color='white'>
              Zoeken
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}