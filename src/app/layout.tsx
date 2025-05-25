import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Urban Streetwear Store",
  description: "Premium streetwear for the modern generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} font-sans bg-white text-black antialiased`}
      >
        <Navbar />
        <main className="min-h-screen pt-[112px] lg:pt-[136px]">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#000",
              border: "1px solid rgba(0,0,0,0.1)",
            },
          }}
          containerStyle={{
            position: "fixed",
            top: "auto",
            left: "auto",
            right: "16px",
            bottom: "16px",
            pointerEvents: "auto",
            zIndex: 9999,
          }}
        />
      </body>
    </html>
  );
}
