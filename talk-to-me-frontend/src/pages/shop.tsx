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
          <div className="cataloog">
            cataloog
          </div>
          <div className="welkomgebruiker">
            Welkom Tim
          </div>
          <div className="jouwgreencoins">
            GreenCoins
          </div>
          <div className="kortingtrein">
            Korting
          </div>
          <div className="doneer">
            doneer
          </div>
          <div className="reisproducten">
            producten
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