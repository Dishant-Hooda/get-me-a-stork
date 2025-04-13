import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/componenets/Navbar";
import Footer from "@/componenets/Footer";
import SessionWrapper from "@/componenets/SessionWraper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Me A Stork",
  description: "Fund your projects or yourself with stork, this is a crowd funding webnsite that can help cretors to fund their projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <div className="min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            <Navbar />
            
              {children}
         
            <Footer />
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
