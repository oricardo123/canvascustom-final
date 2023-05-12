import Link from "next/link";
import Image from "next/image";
import More from "../../../components/More.jsx";
import { fetchCatalogs } from "../../../lib/fetchCatalogs.js";
import { fetchInitialProductsConnection } from "@/lib/fetchInitialProductsConnection";
import { GET_PRODUCTS_CONNECTION } from "@/graphql/queries";
import { useQuery, NetworkStatus, useApolloClient } from "@apollo/client";
import { initializeApollo } from "../../../graphql/client.js";
import { getClient } from "@/lib/client";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { GET_CATALOGS, GET_PRODUCTS_BY_CATALOG } from "@/graphql/queries";

export default async function Catalog({ params: { catalogSlug } }) {
  const client = getClient();
  let productsList = new Array();

  const {
    data: { catalogs },
  } = await client.query({
    query: GET_CATALOGS,
  });

  let hasMoreProducts = true;
  let cursor = null;
  while (hasMoreProducts) {
    const {
      data: { productsConnection },
    } = await client.query({
      query: GET_PRODUCTS_CONNECTION,
      variables: { cursor, size: 2, catalogSlug },
    });
    const { pageInfo, edges } = productsConnection;
    cursor = pageInfo.endCursor;
    productsList = [...productsList, ...edges];
    if (!pageInfo.hasNextPage) hasMoreProducts = false;
  }
  const { name } = catalogs.filter(
    (catalog) => catalog.catalogSlug === catalogSlug
  )[0];
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
          {name} Catalog
        </h1>
        <div className="flex mx-20 ml-[9rem]">
          <ul>
            {catalogs?.map((catalog) => (
              <li key={catalog.catalogSlug}>
                <Link
                  href={{
                    pathname: `/catalog/${catalog.catalogSlug}`,
                  }}
                >
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
            {productsList.map(({ node: product }) => (
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
          </div>
        </div>
      </div>
    </>
  );
}
