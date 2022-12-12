import BookingForm from "@/features/booking/BookingForm";
import AppLayout from "@/features/layout/AppLayout"
import React, { ReactElement } from "react"
import trein from "../assets/img/trein.jpg"
import Image from 'next/image'



export default function Page() {
  return (
    <>

      <div className="trein">
        <div className="index">
        <BookingForm />
        </div>
      </div>

    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}