import type { AppProps } from "next/app"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles"
import AppLayout from "@/features/layout/AppLayout"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


const options: ThemeOptions = {
  typography: {
    fontSize: 13,
    allVariants: {
      fontFamily: "Inter",
      // textTransform: 'none',
      // fontSize: 16,
    },
  },
  palette: {
    primary: {
      main: "#4ebf53",
      dark: "#1b5e20",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2);",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
        disableElevation: true,
        sx: {
          textTransform: "none",
          // fontWeight: 'bold',
          paddingX: 2,
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        // margin: 'dense',
        size: "small",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense",
        sx: {
          fieldset: {
            borderColor: "#d3dae4",
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiRadio: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTab: {
      defaultProps: {
        sx: {
          textTransform: "none",
          fontSize: "0.9rem",
          letterSpacing: "inherit",
        },
      },
    },
  },
}

const theme = createTheme(options)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    // MUI theme
    <ThemeProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

export default MyApp