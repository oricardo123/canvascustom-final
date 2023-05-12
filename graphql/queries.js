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
      specImages {
        id
        url
      }
      specDimensions
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
      name
      image {
        id
        url
        fileName
      }
      productSlug
    }
  }
`;

export const GET_INITIAL_PRODUCTS_CONNECTION = gql`
  query GetProductsConnnection($size: Int!, $catalogSlug: String!) {
    productsConnection(
      first: $size
      where: { catalogs_some: { catalogSlug: $catalogSlug } }
    ) {
      pageInfo {
        endCursor
        hasNextPage
        pageSize
        startCursor
        hasPreviousPage
      }
      edges {
        cursor
        node {
          name
          productSlug
          image {
            id
            url
          }
          catalogs {
            catalogSlug
          }
          id
        }
      }
    }
  }
`;

export const GET_PRODUCTS_CONNECTION = gql`
  query GetProductsConnnection(
    $cursor: String
    $size: Int!
    $catalogSlug: String!
  ) {
    productsConnection(
      after: $cursor
      first: $size
      where: { catalogs_some: { catalogSlug: $catalogSlug } }
    ) {
      pageInfo {
        endCursor
        hasNextPage
        pageSize
        startCursor
        hasPreviousPage
      }
      edges {
        cursor
        node {
          name
          productSlug
          image {
            id
            url
          }
          catalogs {
            catalogSlug
          }
          id
        }
      }
    }
  }
`;
