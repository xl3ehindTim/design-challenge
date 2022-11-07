import { Wrapper } from "@/components/Wrapper"
import AppLayout from "@/features/layout/AppLayout"
import React, { ReactElement } from "react"

export default function Page() {

  return (
    <>
      Homepagina
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