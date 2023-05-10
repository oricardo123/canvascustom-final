import { initializeApollo } from "../graphql/client";
import { GET_PRODUCTS_CONNECTION } from "../graphql/queries";

export async function fetchProductsConnection(cursor, size, catalogSlug) {
  const apolloClient = await initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_PRODUCTS_CONNECTION,
    variables: { cursor, size, catalogSlug },
  });

  return data;
}
