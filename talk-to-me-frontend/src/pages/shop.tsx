import AppLayout from "@/features/layout/AppLayout"
import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"
import image from "../assets/img/tim-brouwers.png"
import image2 from "../assets/img/co2.png"
import { getUser } from "@/features/auth/services/user.service"

export default function Page() {
  const user = getUser();

  return (
    <>

      <Head>
      <title>shop</title>
      </Head>

        <div className="shoppagina">
          <div className="cataloog">
            Baby & Kind <br></br>
            Body & Care <br></br>
            Boeken <br></br>
            Camping & Reizen <br></br>
            Doneren <br></br>
            Eco Wasmiddel <br></br>
            Energiebesparing <br></br>
            Eten & Drinken <br></br>
            Fair Fashion <br></br>
            Huis & Tuin <br></br>
            Insecten & (On)gedierte <br></br>
            Kantoor <br></br>
            Lunchboxen <br></br>
            Outdoor <br></br>
            Waterflessen <br></br>
          </div>

          <div className="welkomgebruiker">
            Welkom <br></br>
            {user?.first_name} {user?.last_name}
          </div>

          <div className="jouwgreencoins">
            <div className="jouw">jouw greencoins</div>
            <div className="jouwlogo"></div>
            <div className="jouwnummer">
              {parseInt(user?.green_coins)}
            </div>
          </div>

          <div className="kortingtrein">
            <div className="kortingtrein1">
              Wissel je GreenCoins in voor korting op je volgende treinticket
            </div>
            <div className="kortingtrein2"></div>
          </div>

          <div className="doneer">
            <div className="doneernu">
              Doneer jouw GreenCoins
            </div>
            <div className="afbeelding1"></div>
            <div className="afbeelding2"></div>
            <div className="afbeelding3"></div>
            <div className="doneerknop">
            <button className="pointer">Doneer nu</button>
            </div>
          </div>

          <div className="reisproducten">
            <div className="duurzamereis">
              Duurzame reis producten
            </div>
            <div className="afbeelding4"></div>
            <div className="afbeelding5"></div>
            <div className="afbeelding6"></div>
            <div className="afbeelding7"></div>
            <div className="bekijkhier">
              <button className="pointer">Bekijk hier</button>
            </div>
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