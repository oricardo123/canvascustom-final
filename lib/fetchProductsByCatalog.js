import { initializeApollo } from "../graphql/client";
import { GET_PRODUCTS_BY_CATALOG } from "../graphql/queries";

export async function fetchProductsByCatalog(catalogSlug) {
  const apolloClient = await initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_PRODUCTS_BY_CATALOG,
    variables: { catalogSlug },
  });

  const catalog = data.catalogs[0];
  return catalog ? catalog.products : [];
}
