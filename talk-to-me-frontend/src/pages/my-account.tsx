import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"
import image from "../assets/img/tim-brouwers.png"

export default function Page() {
  return (
    <>
      <Head>
        <title>My account</title>
      </Head>
      
      <div className="my-account">

        <div className="tim">
        </div>

        <div className="co2bespaard">
            <div className="co2bespaard2">
            <p>Co2 bespaard</p>
            </div>
        </div>

        <div className="reisgeschiedenis">
            <p>Uw reisgeschiedenis</p>
            <div></div>
        </div>

        <div className="greencoins">
            <div className="uwgreencoins">
                Uw greencoins
            </div>

            <div className="greencoins2">
                7000
                <div className="buttonlogin">
                button
                </div>
            </div>

        </div>

        <div className="persoonsgegevens">
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

