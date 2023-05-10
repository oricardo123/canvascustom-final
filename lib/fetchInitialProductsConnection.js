import { initializeApollo } from "../graphql/client";
import { GET_INITIAL_PRODUCTS_CONNECTION } from "../graphql/queries";

export async function fetchInitialProductsConnection(size, catalogSlug) {
  const apolloClient = await initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_INITIAL_PRODUCTS_CONNECTION,
    variables: { size, catalogSlug },
  });

  return data;
}
