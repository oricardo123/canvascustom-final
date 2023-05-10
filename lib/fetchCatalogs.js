import { initializeApollo } from "../graphql/client";
import { GET_CATALOGS } from "../graphql/queries";

export async function fetchCatalogs() {
  const apolloClient = await initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_CATALOGS,
  });

  return data.catalogs;
}
