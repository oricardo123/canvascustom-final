import React, { useEffect } from "react";
import "../styles/globals.css";
import Navbar from "@/components/Navigation/NavBar";
import Footer from "@/components/Navigation/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
