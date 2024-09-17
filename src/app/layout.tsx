import InitialTheme from "@/components/modules/InitialTheme";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "@/components/modules/footer/Footer";

const Vazir = localFont({
  src: [
    {
      path: "../../public/fonts/Vazirmatn-FD-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-FD-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-FD-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-FD-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo X",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  themeColor: "#7480ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="en">
      <body className={Vazir.className}>
        {children}
        <Footer />
        <Toaster />
        <InitialTheme />
      </body>
    </html>
  );
}
