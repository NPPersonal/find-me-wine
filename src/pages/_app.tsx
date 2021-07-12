import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import theme from "../themes/defaultTheme";
import type { AppProps /*, AppContext */ } from "next/app";
import ErrorBoundary from "../components/units/ErrorBoundary/ErrorBoundary";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import LinkTo from "../components/units/LinkTo/LinkTo";

export default function MovieReviewApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, maximum-scale=1, user-scalable=0, width=device-width"
        />
      </Head>

      <ErrorBoundary
        fallback={
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h2">
              Oooops ! Looks like somthing is not right
            </Typography>
            <LinkTo
              text="Back to home"
              linkTo='/'
            />
          </Box>
        }
      >
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
}