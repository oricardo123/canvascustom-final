import { initializeApollo } from "../graphql/client";
import { GET_PRODUCT } from "../graphql/queries";

export async function fetchProduct(productSlug) {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_PRODUCT,
    variables: { productSlug },
  });

  return data.product;
}
