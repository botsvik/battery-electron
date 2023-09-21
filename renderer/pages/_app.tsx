import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { inter } from "@renderer/styles/fonts";
import "@renderer/styles/globals.css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${inter.variable} font-sans flex flex-col h-screen`}>
        <div className="h-titlebar bg-primary shrink-0 region-drag" />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
