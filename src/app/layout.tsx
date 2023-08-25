import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers as ChakraProviders, ColorMode } from "./chakra.ui.provider";
import { Providers as ReduxProviders } from "../redux/redux.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wine recommendation",
  description: "App for recommending wines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorMode />
        <ReduxProviders>
          <ChakraProviders>{children}</ChakraProviders>
        </ReduxProviders>
      </body>
    </html>
  );
}
