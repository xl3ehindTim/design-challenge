import { Wrapper } from "@/components/Wrapper"
import BookingForm from "@/features/booking/BookingForm";
import AppLayout from "@/features/layout/AppLayout"
import axiosInstance from "@/xhr/axiosInstance"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { ReactElement } from "react"



export default function Page() {
  const [stations, setStations] = React.useState([{
    beneCode: "NLAAC",
    name: "Amsterdam Sloterdijk"
  }]);

  const [station, setStation] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStation(event.target.value as string);
  };

  // const getStations = async () => {
  //   axiosInstance.get("https://www.nsinternational.com/api/v2/stations/").then((res) => setStations(res.data))
  // }

  // React.useEffect(() => {
  //   getStations()
  // }, [])

  return (
    <>
      Where do you want to go?

      <BookingForm />
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