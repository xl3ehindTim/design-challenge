import axiosInstance from '@/xhr/axiosInstance';
import { ArrowRight } from '@mui/icons-material';
import { Box, Button, Card, Stack, CardActions, CardContent, Grid, Typography, CardHeader, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RepeatIcon from '@mui/icons-material/Repeat';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import Link from 'next/link';
import { IStation } from './BookingForm';

interface IProps {
  route: string;
  departureDate: string;
  fromStation: IStation;
  toStation: IStation;
}

export interface IBookingEntry {
  id: any;
  arrival_date: string;
  departure_date: string;
  number_of_transfers: number;
}

function secondsToHoursAndMinutes(d): string {
  d = Number(d);
  let hours = Math.floor(d / 3600);
  let minutes = Math.floor(d % 3600 / 60);

  return `${hours}u ${minutes}m`
}

export default function BookingEntryList(props: IProps) {
  const { route, departureDate, fromStation, toStation } = props;

  // Booking entries list
  const [bookingEntries, setBookingEntries] = React.useState<IBookingEntry[] | []>([]);
  const [selectedEntry, setSelectedEntry] = React.useState<IBookingEntry | null>(null);

  // Function to handle select
  const handleSelect = (entry: IBookingEntry) => {
    // @ts-ignore
    setSelectedEntry(entry?.id === selectedEntry?.id ? null : entry)
  }

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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ margin: 1 }}
      >
        <Stack
          direction="row"
          spacing={2}
        >
          <Typography variant='h5'>{fromStation?.name}</Typography>
          <ArrowRightAltIcon fontSize='large' />
          <Typography variant='h5'>{toStation?.name}</Typography>
        </Stack>

        {/* <Link href={`/`}>
          <Button sx={{ width: 200, height: 40 }} variant='contained'>Edit</Button>
        </Link> */}
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Card sx={{ margin: 1 }}>
            <CardContent>
              <Typography variant='body2'>
                {new Date(departureDate).toLocaleDateString('nl-NL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </CardContent>
          </Card>
          
          {bookingEntries?.map((entry: IBookingEntry, index) => (
            <Card sx={{
              cursor: 'pointer',
              margin: 1,
              backgroundColor: selectedEntry?.id === entry?.id ? 'white' : 'lightgray',
            }} onClick={() => handleSelect(entry)}>
              <CardContent>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography>{new Date(entry.departure_date).toLocaleTimeString('nl-NL').slice(0, -3)}</Typography>
                  <ArrowRightAltIcon />
                  <Typography variant="body1">
                    {new Date(entry.arrival_date).toLocaleTimeString('nl-NL').slice(0, -3)}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={0.5}>
                  <AccessTimeIcon />
                  {secondsToHoursAndMinutes((new Date(entry.arrival_date).getTime() - new Date(entry.departure_date).getTime()) / 1000)}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ margin: 1 }}>
            <CardContent>
              <Typography variant='h6'>Reis</Typography>
              {selectedEntry ? (
                <>
                  <Typography variant='body2'>
                    {new Date(selectedEntry?.departure_date).toLocaleDateString('nl-NL', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                  
                  <Divider sx={{ marginTop: 1 }} />

                  <Timeline
                    sx={{
                      [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.1,
                      },
                    }}
                  >
                    <TimelineItem>
                      <TimelineOppositeContent color="textSecondary">
                        {new Date(selectedEntry?.departure_date).toLocaleTimeString('nl-NL').slice(0, -3)}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>{fromStation?.name}</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineOppositeContent color="textSecondary">
                        {new Date(selectedEntry?.arrival_date).toLocaleTimeString('nl-NL').slice(0, -3)}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                      </TimelineSeparator>
                      <TimelineContent>{toStation?.name}</TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </>
              ) : (
                <Typography>
                  Selecteer eerst een tijdstip
                </Typography>
              )}

              <Divider />

              {/* Pricing */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ marginTop: 2 }}
              >
                <Typography variant='h6'>Totaal</Typography>
                <Typography variant='h6'>{selectedEntry ? new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(selectedEntry?.price) : "€ 0,00"}</Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Link href={`/`}>
                <Button fullWidth>Annuleren</Button>
              </Link>
              <Button disabled={!selectedEntry} variant='contained' fullWidth>Boek uw reis</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
