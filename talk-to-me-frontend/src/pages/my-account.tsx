import * as React from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import trein from "../assets/img/trein.jpg"
import Image from "next/image"
import image from "../assets/img/tim-brouwers.png"
import image2 from "../assets/img/co2.png"
import axiosInstance from "@/xhr/axiosInstance"

export default function Page() {
  const [orders, setOrders] = React.useState([]);

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
          </div>
        </div>
      </div>

      <table>
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

