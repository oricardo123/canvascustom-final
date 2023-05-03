import React, { useEffect } from "react";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";

export default function App({ Component, pageProps }) {
  return (
    // <ApolloProvider client={client}>
    <Component {...pageProps} />
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
