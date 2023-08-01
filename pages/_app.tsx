import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import {WeatherProvider} from "@/store/weather-context";

export default function App({Component, pageProps}: AppProps) {
  return (
      <>
        <WeatherProvider>
          <Component {...pageProps} />
        </WeatherProvider>
      </>
  );
}
