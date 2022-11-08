import React, { ReactElement } from "react"
import AppLayout from "@/features/layout/AppLayout"
import { useRouter } from "next/router"
import { Wrapper } from "@/components/Wrapper"
import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Link from "next/link"
import axiosInstance from "@/xhr/axiosInstance"
import { IStation } from "@/features/booking/BookingForm"
import BookingCalender from "@/features/booking/BookingCalender"

export default function Page() {
  const router = useRouter()
  const { id: fromToRoute } = router.query

  const [fromStation, setFromStation] = React.useState<IStation | undefined>(undefined);
  const [toStation, setToStation] = React.useState<IStation | undefined>(undefined);

  React.useEffect(() => {
    if (fromToRoute?.includes('-')) {
      // @ts-ignore
      axiosInstance.get("/stations/" + fromToRoute?.split('-')[0]).then(({ data }) => setFromStation(data))
      // @ts-ignore
      axiosInstance.get("/stations/" + fromToRoute?.split('-')[1]).then(({ data }) => setToStation(data))
    }
  }, [fromToRoute])

  if (!fromToRoute?.includes('-')) {
    return <>Loading...</>
  }

  if (!fromStation?.beneCode || !toStation?.beneCode) {
    return <>Loading...</>
  }

  return (
    <>
      <Box sx={{
        p: 10,
        paddingBottom: 0,
      }}>
        <Grid container>
          <Grid item xs={9}>
            <Stack direction="row" spacing={1}>
              <Typography variant='h5'>{fromStation?.name}</Typography>
              <ArrowRightAltIcon fontSize='large' />
              <Typography variant='h5'>{toStation?.name}</Typography>
            </Stack>

            {/* 1 reiziger - 0 kortings-/loyaltykaarten */}
          </Grid>
          <Grid item xs={2}>
            <Link href={`/`}>
              <Button sx={{ width: 200, height: 40 }} variant='contained'>Edit</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>

      <BookingCalender route={`${fromStation?.beneCode}-${toStation?.beneCode}`} />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <Wrapper>{page}</Wrapper>
    </AppLayout>
  )
}