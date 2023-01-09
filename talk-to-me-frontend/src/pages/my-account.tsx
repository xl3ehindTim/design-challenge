import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"
import image from "../assets/img/tim-brouwers.png"
import image2 from "../assets/img/co2.png"

export default function Page() {
  return (
    <>
      <Head>
        <title>My account</title>
      </Head>
      
      <div className="my-account">

        <div className="tim"></div>

        <div className="greencoins">
            <div className="greencoins1">
                Uw GreenCoins
            </div>
            <div className="greencoins2">
                Hoeveel GreenCoins u heeft bespaard
            </div>
        </div>

        <div className="persoonsgegevens">
            <div className="welkom-gebruiker">
                Welkom gebruiker
            </div>
            <div className="uw-gegevens">
                Uw gegevens
            </div>
        </div>
        

        <div className="co2bespaard">
            <div className="co2bespaard2">
                Co2 bespaard
            </div>
            <div className="co2gegevens">
            </div>
        </div>

        <div className="reisgeschiedenis">
            <div className="uw-reisgeschiedenis1">
                Uw reisgeschiedenis
            </div>
            <div className="uw-reisgeschiedenis2">
                Hier staat uw reisgeschiedenis
            </div>
        </div>


      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <AppLayout>
        {page}
      </AppLayout>
    )
  }

