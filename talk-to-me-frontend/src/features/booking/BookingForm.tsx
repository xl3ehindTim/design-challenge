import React, { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import axiosInstance from "@/xhr/axiosInstance"
import { AsyncSelectField } from "@/components/Form/AsyncSelectField"
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
      <AsyncSelectField
        label="From"
        control={control}
        error={errors.fromStation}
        isSearchable
        isClearable
        loadOptions={fetchStations}
        {...register("fromStation")}
      />

      <AsyncSelectField
        label="To"
        control={control}
        error={errors.toStation}
        isSearchable
        isClearable
        loadOptions={fetchStations}
        {...register("toStation")}
      />
      <DateField
        label="Vertrekdatum"
        control={control}
        error={errors.departureDate}
        name="departureDate"
      />

      <button type="submit">
        Zoeken
      </button>
    </form>
  )
}