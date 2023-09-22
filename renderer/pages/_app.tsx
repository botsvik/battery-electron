import type { AppProps } from "next/app";

import { inter } from "@renderer/styles/fonts";
import "@renderer/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${inter.variable} font-sans flex flex-col h-screen`}>
      <div className="h-titlebar bg-background shrink-0 region-drag" />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
