import type { AppProps } from "next/app";

import { inter } from "@renderer/styles/fonts";
import "@renderer/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
