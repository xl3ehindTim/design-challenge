import axiosInstance from '@/xhr/axiosInstance';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';

interface IProps {
  route: string;
  departureDate: string;
}

export interface IBookingEntry {
  arrival_date: string;
  departure_date: string;
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
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {new Date(entry.departure_date).toLocaleTimeString('nl-NL')} {"->"} {new Date(entry.arrival_date).toLocaleTimeString('nl-NL')}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {(new Date(entry.arrival_date).getTime() - new Date(entry.departure_date).getTime()) / 1000}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  )
}