import "../styles/normalize.css";
import "../styles/global.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import { DataProvider } from "../controller/store/globalstate";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </DataProvider>
  );
}
export default MyApp;
