
import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/layout/Header/Header";
import HomeInfo from "@/components/layout/HomeInfo/HomeInfo";
import Footer from "@/components/layout/Footer/Footer";
import { ReduxProvider } from "@/store/provider";
import Authmodal from "@/components/layout/AuthModal/Authmodal";
import HeaderModal from "@/components/layout/HeaderModal/HeaderModal";

export const metadata: Metadata = {
  title: "MATALEX",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //1
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
        <Authmodal />
        <HeaderModal />
          <HomeInfo />
          <Header />
          <main className="h-full">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
