import React, { useEffect } from "react";
import "../styles/globals.css"
import Navbar from "@/components/FooterNavbar/NavBar";
import Footer from "@/components/FooterNavbar/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
