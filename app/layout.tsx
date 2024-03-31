import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthContext from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./providers/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodieMarket",
  description:
    "FoodieMarket to aplikacja, która łączy miłośników zdrowego jedzenia z lokalnymi dostawcami, ułatwiając zamawianie świeżych produktów spożywczych",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <AuthContext>
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </AuthContext>
      </body>
    </html>
  );
}
