import axiosInstance from '@/xhr/axiosInstance';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import BookingEntryList from './BookingEntryList';

export interface IEntry {
  id: string;
  date: string;
  category: "LOWEST" | "HIGHEST" | "AVERAGE";
  price: number;
}

interface IProps {
  route: string;
}

// Variable for specific colors
const CATEGORY_COLOR = {
  LOWEST: "#00aa89",
  AVERAGE: "#ffc917",
  HIGHEST: "#fe6200",
}

export default function BookingCalender(props: IProps) {
  const { route } = props;
  
  const [calenderEntries, setCalenderEntries] = React.useState<IEntry[] | []>([]);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  // Function that will get calender entries from API
  const getCalenderEntries = async () => {
    axiosInstance.get(`/calender-entries/?route=${route}`).then(({ data }) => setCalenderEntries(data.results))
  }

  // Function to handle select
  const handleSelect = (date: string) => {
    setSelectedDate(date);
  }

  // useEffect to get Calender entries
  useEffect(() => {
    getCalenderEntries();
  }, [route])

  return (
    <>
      <Box sx={{
        p: 10,
        paddingTop: 4,
      }}>
        <Typography variant='h4'>Kies uw reis</Typography>
        <Grid container spacing={1}>
          {calenderEntries?.map((entry, index) => (
            <Grid item>
              <Card onClick={() => handleSelect(entry?.date)} sx={{
                backgroundColor: selectedDate === entry?.date ? 'lightgreen' : 'lightgray',
                cursor: 'pointer',
                borderBottom: `2px solid ${CATEGORY_COLOR[entry.category]}`,
                width: 130,

              }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {new Date(entry.date).toLocaleDateString('nl-NL')}
                  </Typography>
                  {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(entry.price)}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary" gutterBottom>
          Prijs op basis van 1 volw. enkele reis. De getoonde prijzen zijn altijd de laagste prijzen. Hoe korter voor vertrek hoe hoger de prijs. Vroeg boeken loont!
        </Typography>

        {selectedDate ? <BookingEntryList departureDate={selectedDate} route={route} /> : null}
      </Box>
    </>
  )
}