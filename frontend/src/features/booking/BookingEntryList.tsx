import axiosInstance from '@/xhr/axiosInstance';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';

interface IProps {
  route: string;
  departureDate: string;
}

export interface IBookingEntry {
  arrival_date: string;
  departure_date: string;
}

function secondsToHoursAndMinutes(d): string {
  d = Number(d);
  let hours = Math.floor(d / 3600);
  let minutes = Math.floor(d % 3600 / 60);

  return `${hours}u ${minutes}m`
}

export default function BookingEntryList(props: IProps) {
  const { route, departureDate } = props;

  // Booking entries list
  const [bookingEntries, setBookingEntries] = React.useState<IBookingEntry[] | []>([]);

  // Fetch booking entries from API
  const getBookingEntries = async () => {
    axiosInstance.get(`/booking-entries/?route=${route}&date=${departureDate}`).then(({ data }) => setBookingEntries(data.results))
  }

  // useEffect to check if route or departureDate have been changed. This will call getBookingEntries to get data
  useEffect(() => {
    getBookingEntries();
  }, [route, departureDate])

  return (
    <>
      {bookingEntries?.map((entry, index) => (
        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {new Date(entry.departure_date).toLocaleTimeString('nl-NL').slice(0, -3)} {"->"} {new Date(entry.arrival_date).toLocaleTimeString('nl-NL').slice(0, -3)}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {secondsToHoursAndMinutes((new Date(entry.arrival_date).getTime() - new Date(entry.departure_date).getTime()) / 1000)}
            </Typography>

          </CardContent>
          <CardActions>
            <Button variant='contained' size="small">Boek nu</Button>
          </CardActions>
        </Card>
      ))}
    </>
  )
}
