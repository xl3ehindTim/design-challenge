import React, { ReactElement } from "react"
import AppLayout from "@/features/layout/AppLayout"
import { useRouter } from "next/router"
import { Wrapper } from "@/components/Wrapper"
import axiosInstance from "@/xhr/axiosInstance"
import { IStation } from "@/features/booking/BookingForm"
import BookingEntryList from "@/features/booking/BookingEntryList"

export default function Page() {
  const router = useRouter()
  const { id: fromToRoute, date } = router.query

  const [fromStation, setFromStation] = React.useState<IStation | undefined>(undefined);
  const [toStation, setToStation] = React.useState<IStation | undefined>(undefined);

  React.useEffect(() => {
    if (fromToRoute?.includes('-')) {
      // @ts-ignore
      axiosInstance.get("/stations/" + fromToRoute?.split('-')[0]).then(({ data }) => setFromStation(data))
      // @ts-ignore
      axiosInstance.get("/stations/" + fromToRoute?.split('-')[1]).then(({ data }) => setToStation(data))
    }
  }, [fromToRoute])

  if (!fromToRoute?.includes('-')) {
    return <>Loading...</>
  }

  if (!fromStation?.beneCode || !toStation?.beneCode) {
    return <>Loading...</>
  }

  return (
    <>
      <BookingEntryList fromStation={fromStation} toStation={toStation} departureDate={date} route={`${fromStation?.beneCode}-${toStation?.beneCode}`} />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <Wrapper>{page}</Wrapper>
    </AppLayout>
  )
}