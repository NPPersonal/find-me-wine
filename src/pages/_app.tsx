import "../styles/globals.css";
import type { AppProps } from "next/app";
import wrapper from "../redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { defaultTheme } from "../themes/theme";

function App({ Component, pageProps }: AppProps) {
  const redux_store = wrapper.useWrappedStore(pageProps);
  return (
    <ChakraProvider theme={defaultTheme}>
      <Provider store={redux_store.store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
