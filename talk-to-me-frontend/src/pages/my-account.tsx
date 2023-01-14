import * as React from "react"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"
import image from "../assets/img/tim-brouwers.png"
import image2 from "../assets/img/co2.png"
import axiosInstance from "@/xhr/axiosInstance"
import { getUser } from "@/features/auth/services/user.service"
import greencoin from "../../assets/img/Greencoin.png"

export default function Page() {
  const [orders, setOrders] = React.useState([]);
  const user = getUser()

  console.log(user)

  const getOrders = async () => {
    axiosInstance.get("/orders/").then(({ data }) => setOrders(data.results))
  }

  React.useEffect(() => {
    getOrders()
  }, [])

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
          <div className="greencoinslogo">
          </div>
          <div className="greencoinsnummer"></div>
        </div>

        <div className="persoonsgegevens">
          <div className="welkom-gebruiker">
            Welkom <span className="capitalize">{user?.first_name}</span> <span className="capitalize">{user?.last_name}</span>
          </div>
          <div className="uw-gegevens">
            <table>
              <tbody>
                <tr>
                  <td>Voornaam:</td>
                  <td>{user?.first_name}</td>
                </tr>
                <tr>
                  <td>Achternaam:</td>
                  <td>{user?.last_name}</td>
                </tr>
                <tr>
                  <td>E-mailadres:</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>Greencoins:</td>
                  <td>{user?.green_coins}</td>
                </tr>
              </tbody>
            </table>
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
            <table id="reisgeschiedenis">
              <thead>
                <tr>
                  <th>Bestemming</th>
                  <th>Reisdatum</th>
                  <th>Prijs</th>
                  <th>Reisklasse</th>
                  <th>Tickets</th>
                  <th>Besparing</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order: any, index) => (
                  <tr key={index}>
                    <td>{order.booking_option}</td>
                    <td>Reisdatum</td>
                    <td>{order?.total_amount}</td>
                    <td>{order.travel_class}</td>
                    <td>{order.amount_of_tickets}</td>
                    <td>Besparing</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

