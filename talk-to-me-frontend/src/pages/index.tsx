import * as React from "react"
import Head from "next/head"
import AppLayout from "@/features/layout/AppLayout"
import { HiSwitchHorizontal } from "react-icons/hi"
import axiosInstance from "@/xhr/axiosInstance"
import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter()

  const fromRef: any = React.useRef(null);
  const toRef: any = React.useRef(null);

  const [departureDate, setDepartureDate] = React.useState(null);
  const [stations, setStations] = React.useState([]);

  const handleSubmit = async (e) => {
    if (e.target.from.value.length != 5 || e.target.to.value.length != 5 || departureDate == null) return;

    const from = e.target.from.value;
    const to = e.target.to.value;

    router.push(`/search/${from}-${to}?date=${departureDate}`)
  }

  const handleSwap = () => {
    const oldFromValue = fromRef.current.value;

    // Swap values
    fromRef.current.value = toRef.current.value
    toRef.current.value = oldFromValue
  }

  const getStations = () => {
    axiosInstance.get("/stations/").then(({ data }) => setStations(data.results))
  }

  React.useEffect(() => {
    getStations()
  }, [])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="trein">
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(e)
        }}>
          <div className="fromto">
            <div className="from">
              <label>Van:</label>
              <select ref={fromRef} name="from" className="w-100">
                <option disabled selected>Selecteer een vertrekpunt</option>
                {stations?.map((station: { beneCode: string, name: string }, index) => (
                  <option value={station.beneCode}>{station.name}</option>
                ))}
              </select>
            </div>
            <div className="pijltje">
              <br />
              <HiSwitchHorizontal onClick={handleSwap} className="pointer" />
            </div>
            <div className="to">
              <label>Naar:</label>
              <select ref={toRef} name="to" className="w-100">
                <option disabled selected>Selecteer een aankomstpunt</option>
                {stations?.map((station: { beneCode: string, name: string }, index) => (
                  <option value={station.beneCode}>{station.name}</option>
                ))}
              </select>
            </div>
            <div className="vertrek">
              <input onChange={(e: any) => setDepartureDate(e.target.value)} className="w-100" type="date" placeholder="Vetrek datum"></input>
            </div>
            <div className="zoeken2">
              <button className="search-button pointer">Zoeken</button>
            </div>
          </div>
        </form>
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