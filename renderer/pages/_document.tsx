import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <body className="bg-background text-foreground antialiased select-none">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;