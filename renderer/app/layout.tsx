import { FunctionComponent, PropsWithChildren, Suspense } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import { SWRProvider } from "./_components";

import "./styles.css";

export const metadata: Metadata = {
  title: "Hello",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
});

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" dir="ltr">
      <head />
      <body
        className={`${inter.variable} font-sans bg-background text-foreground antialiased select-none`}
      >
        <div className="flex flex-col h-screen">
          <div className="h-titlebar font-medium px-2 flex items-center bg-primary shrink-0 region-drag">
            <span className="text-xs text-primary-foreground">Welcome</span>
          </div>
          <SWRProvider>
            <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
          </SWRProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
