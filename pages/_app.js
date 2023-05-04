import React, { useEffect } from "react";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";
import '../styles/globals.css';
import Navbar from "@/components/FooterNavbar/NavBar";
import Footer from "@/components/FooterNavbar/Footer";

export default function App({ Component, pageProps }) {
  return (
    // <ApolloProvider client={client}>
    <>
      <Navbar /> {/* Add the Navbar component */}
      <Component {...pageProps} />
      <Footer /> {/* Add the Footer component */}
    </>
    // </ApolloProvider>
  );
}

// export async function getServerSideProps() {
//   const { getCatalogs, dataCatalogs, errorCatalogs, loadingCatalogs } =
//     useCatalogs();

//   const { data } = await getCatalogs();
//   console.log("data", data);
//   if (data) {
//     console.log(data);
//   }

//   return {
//     props: {},
//   };
// }
