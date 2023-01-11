import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"
import { HiSwitchHorizontal } from "react-icons/hi"

export default function Page() {
  return (
    <>
      <Head>
        <title>bookingform</title>
      </Head>

      <div className="trein">
        <div className="fromto">
          <div className="from">
            <input className="w-100" type="text" placeholder="Van"></input>
          </div>
          <div className="pijltje">
            <HiSwitchHorizontal className="pointer"/>
          </div>
          <div className="to">
            <input className="w-100" type="text" placeholder="Naar"></input>
          </div>
          <div className="vertrek">
            <input className="w-100" type="date" placeholder="Vetrek datum"></input>
          </div>
          <div className="zoeken2">
            <button className="search-button pointer">Zoeken</button>
          </div>
        </div>
      </div>
    </>
  )
}

/* style={{ width: "100%" }} */

Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}