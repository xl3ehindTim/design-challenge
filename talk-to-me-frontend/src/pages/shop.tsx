import AppLayout from "@/features/layout/AppLayout"
import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"
import image from "../assets/img/tim-brouwers.png"
import image2 from "../assets/img/co2.png"
import { getUser } from "@/features/auth/services/user.service"
import tas from "../assets/img/tas.png"
import poetsen from "../assets/img/poetsen.png"
import zeep from "../assets/img/zeep.png"
import zeep2 from "../assets/img/zeep2.png"
import wwf from "../assets/img/wwf.jpg"
import greenpeace from "../assets/img/greenpeace.jpg"
import justdig from "../assets/img/just.jpeg"
import ns from "../assets/img/ns.jpg"

export default function Page() {
  const user = getUser();

  return (
    <>

      <Head>
      <title>shop</title>
      </Head>

        <div className="shoppagina">
          <div className="cataloog">
            <div>Baby & Kind</div><br></br>
            <br></br>
            <div>Body & Care</div><br></br>
            <br></br>
            <div>Boeken</div><br></br>
            <br></br>
            <div>Camping & Reizen</div><br></br>
            <br></br>
            <div>Doneren</div><br></br>
            <br></br>
            <div>Eco Wasmiddel</div><br></br>
            <br></br>
            <div>Energiebesparing</div><br></br>
            <br></br>
            <div>Eten & Drinken</div><br></br>
            <br></br>
            <div>Fair Fashion</div><br></br>
            <br></br>
            <div>Huis & Tuin</div><br></br>
            <br></br>
            <div>Insecten & (On)gedierte</div><br></br>
            <br></br>
            <div>Kantoor</div><br></br>
            <br></br>
            <div>Lunchboxen</div><br></br>
            <br></br>
            <div>Outdoor</div><br></br>
            <br></br>
            <div>Waterflessen</div><br></br>
            <br></br>
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
            <button className="pointer buttonshop">Doneer nu</button>
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
              <button className="pointer buttonshop">Bekijk hier</button>
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