import { Wrapper } from "@/components/Wrapper"
import BookingForm from "@/features/booking/BookingForm";
import AppLayout from "@/features/layout/AppLayout"
import React, { ReactElement } from "react"
import banner from "../assets/img/banner.png"
import Image from 'next/image'
import { Box, Card, CardContent } from "@mui/material";


export default function Page() {
  return (
    <>
      <Box sx={{
        position: 'relative',
        display: 'inline-block',
        pt: 1
      }}>
        <Image style={{
          display: 'block',
          maxWidth: '100%',
          height: '120px',
          margin: 'auto',
          padding: 'auto',
        }} src={banner} alt="" width="1500px" height="560px" />
        <Box sx={{
          position: 'absolute',
          height: '27%',
          textAlign: 'center',
          width: '50%',
          margin: 'auto',
          border: '1px solid white',
          borderRadius: '15px',
          // top: 0,
          bottom: 50,
          right: 0,
          left: 0,
          backgroundColor: 'white'
        }}>
          <br />
          <BookingForm />
        </Box>
      </Box>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
      {/* <Wrapper>{page}</Wrapper> */}
    </AppLayout>
  )
}