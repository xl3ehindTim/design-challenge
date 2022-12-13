import AppLayout from "@/features/layout/AppLayout"

export default function Page() {
  return (
    <>
    Shop
    </>
  )
}

Page.getLayout = function getLayout(page: any) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}