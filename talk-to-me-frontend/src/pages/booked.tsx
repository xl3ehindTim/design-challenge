import { Wrapper } from "@/components/Wrapper"
import BookingForm from "@/features/booking/BookingForm";
import AppLayout from "@/features/layout/AppLayout"
import React, { ReactElement } from "react"
import banner from "../assets/img/booked.png"
import Image from 'next/image'

export default function Page() {
  return (
    <div style={{
      padding: 20,
      paddingTop: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image style={{
        display: 'block',
        maxWidth: '100%',
        height: '150px',
        margin: 'auto',
        padding: 'auto',
      }} src={banner} alt="" width="600px" height="400px" />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <Wrapper>
        {page}
      </Wrapper>
    </AppLayout>
  )
}