import AppLayout from "@/features/layout/AppLayout"
import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"
import image from "../assets/img/tim-brouwers.png"
import image2 from "../assets/img/co2.png"

export default function Page() {
  return (
    <>

      <Head>
      <title>shop</title>
      </Head>
      
        <div className="shoppagina">
          <div className="Cataloog">
            test 1
          </div>
          <div className="welkomgebruiker">
            test 2
          </div>
          <div className="jouwgreencoins">
            test 3
          </div>
          <div className="kortingtrein">
            test 4
          </div>
          <div className="doneer">
            test 5
          </div>
          <div className="reisproducten">
            test 6
          </div>
        </div>
    </>
  )
}

Page.getLayout = function getLayout(page: any) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}