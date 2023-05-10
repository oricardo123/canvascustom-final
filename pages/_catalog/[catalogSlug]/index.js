import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../../components/Navigation/Breadcrumbs.js";
import More from "../../../components/More.jsx";
import { fetchCatalogs } from "../../../lib/fetchCatalogs.js";
import { fetchInitialProductsConnection } from "@/lib/fetchInitialProductsConnection";
import { GET_PRODUCTS_CONNECTION } from "@/graphql/queries";
import { useQuery, NetworkStatus, useApolloClient } from "@apollo/client";
import { initializeApollo } from "../../../graphql/client.js";

function Catalog({ catalogs, catalogSlug, initialProductsData }) {
  const client = useApolloClient();

  const { data, fetchMore, networkStatus, refetch } = useQuery(
    GET_PRODUCTS_CONNECTION,
    {
      key: catalogSlug,
      variables: { size: 2, catalogSlug, cursor: null },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        console.log("data1", data);
        console.log("*********cache", client.cache.extract());
      },
      onError: (error) => {
        console.error("GraphQL Query Error:", error);
      },
    }
  );

  console.log("data2", data?.productsConnection);

  useEffect(() => {
    if (!data) {
      refetch({ size: 2, catalogSlug, cursor: null });
    }
  }, [catalogSlug, data, refetch]);

  const loading = networkStatus === NetworkStatus.fetchMore;
  const { pageInfo } =
    data?.productsConnection || initialProductsData?.productsConnection || {};

  // const loadMoreProducts = () => {
  //   if (pageInfo?.hasNextPage) {
  //     fetchMore({
  //       variables: {
  //         cursor: pageInfo?.endCursor,
  //         size: 2,
  //         catalogSlug,
  //       },
  //     });
  //   }
  // };

  const loadMoreProducts = () => {
    if (pageInfo?.hasNextPage) {
      console.log("Current endCursor:", pageInfo?.endCursor); // Log the endCursor
      fetchMore({
        variables: {
          cursor: pageInfo?.endCursor,
          size: 2,
          catalogSlug,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          const newProducts = fetchMoreResult.productsConnection.edges.filter(
            ({ node: { id: newId } }) =>
              !previousResult.productsConnection.edges.some(
                ({ node: { id: oldId } }) => oldId === newId
              )
          );

          return {
            productsConnection: {
              ...fetchMoreResult.productsConnection,
              edges:
                previousResult.productsConnection.edges.concat(newProducts),
            },
          };
        },
      });
    }
  };

  // const filteredProducts = products.filter(({ node: product }) => {
  //   return product?.catalogs?.some(
  //     (catalog) => catalog.catalogSlug === catalogSlug
  //   );
  // });

  return (
    <>
      <div className="mt-24">
        <Breadcrumbs
          items={[
            { label: "Catalog", href: "/catalog" },
            {
              label: catalogSlug.charAt(0).toUpperCase() + catalogSlug.slice(1),
              href: `/catalog/${catalogSlug}`,
            },
          ]}
        />
      </div>
      <div className="min-h-[64.8vh]">
        <h1 className="text-4xl font-bold leading-tight mb-[4rem] ml-[9rem] mt-10">
          Catalog
        </h1>
        <div className="flex mx-20 ml-[9rem]">
          <ul>
            {catalogs?.map((catalog) => (
              <li key={catalog.catalogSlug}>
                <Link href={`/catalog/${catalog.catalogSlug}`}>
                  <span
                    className={
                      catalog.name.toLowerCase() === catalogSlug
                        ? "text-xl"
                        : ""
                    }
                  >
                    {catalog.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 3xl:grid-cols-12 gap-x-10 gap-y-16 place-items-center text-center ml-[9rem]">
            {data?.productsConnection?.edges.map(({ node: product }) => (
              <Link
                key={product.productSlug}
                href={`/catalog/${catalogSlug}/${product.productSlug}`}
              >
                <Image
                  src={product.image[0]?.url}
                  alt={product.name}
                  width={100}
                  height={100}
                />
                {product.name}
              </Link>
            ))}
            {pageInfo.hasNextPage && (
              <More
                pageInfo={pageInfo}
                catalogSlug={catalogSlug}
                loadMoreProducts={loadMoreProducts}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const catalogs = await fetchCatalogs();
  const paths = catalogs.map((catalog) => ({
    params: { catalogSlug: catalog.catalogSlug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { catalogSlug, catalogName } = params;
  const apolloClient = await initializeApollo();

  console.log("am i here??????");
  const initialProductsData = await fetchInitialProductsConnection(
    2,
    catalogSlug,
    apolloClient
  );

  const catalogs = await fetchCatalogs(apolloClient);
  return {
    props: {
      catalogs,
      catalogSlug,
      initialProductsData,
    },
    revalidate: 60,
  };
}

export default Catalog;
