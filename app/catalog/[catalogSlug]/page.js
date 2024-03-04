import Link from "next/link";
import Image from "next/image";
import Head from "next/head.js";
import { GET_PRODUCTS_CONNECTION } from "@/graphql/queries";
import { getClient } from "@/lib/client";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { GET_CATALOGS } from "@/graphql/queries";

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
    <div className="mb-24 text-gray-400">
      <Head>
        <title>{catalogSlug}</title>
      </Head>
      <div className="mt-[7rem]">
        <Breadcrumbs
          items={[
            { label: "Collection", href: "/catalog" },
            {
              label: catalogSlug.charAt(0).toUpperCase() + catalogSlug.slice(1),
              href: `/catalog/${catalogSlug}`,
            },
          ]}
        />
      </div>

      <div className="flex mr-5 mt-10 xs:ml-4 lg:mx-[9rem] place-content-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-[4rem]">
            {name}
          </h1>
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
        </div>
        <div className="grid grid-cols-5 gap-x-3 gap-y-16 lg:gap-x-10 text-center ml-4 lg:ml-[9rem] ">
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
  );
}
