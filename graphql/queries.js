import { gql } from "@apollo/client";

export const GET_CATALOGS = gql`
  query getCatalogs {
    catalogs {
      name
      id
      image {
        url
      }
      products {
        id
        name
        description
        image {
          id
          url
          fileName
        }
      }
      catalogSlug
    }
  }
`;

export const GET_PRODUCTS_BY_CATALOG = gql`
  query GetProductsByCatalog($catalogSlug: String!) {
    catalogs(where: { catalogSlug: $catalogSlug }) {
      id
      name
      products {
        id
        name
        image {
          id
          url
          fileName
        }
        productSlug
      }
      catalogSlug
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($productSlug: String!) {
    product(where: { productSlug: $productSlug }) {
      id
      description
      image {
        id
        url
        fileName
      }
      productSlug
    }
  }
`;
