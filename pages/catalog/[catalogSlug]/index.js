import { fetchCatalogs } from "../../../lib/fetchCatalogs";
import { fetchProductsByCatalog } from "../../../lib/fetchProductsByCatalog";
import Breadcrumbs from "../../../components/Navigation/Breadcrumbs.js";
import Link from "next/link";
import Image from "next/image";
import CatalogNav from "@/components/Navigation/CatalogNav";
import More from "../../../components/More.jsx";
import { fetchInitialProductsConnection } from "@/lib/fetchInitialProductsConnection";

function Catalog({ catalogs, catalogSlug, products, pageInfo }) {
  return (
    <>
      <div className="mt-24">
        <Breadcrumbs
          items={[
            { label: "Catalog", href: "/catalog" },
            { label: catalogSlug, href: `/catalog/${catalogSlug}` },
          ]}
        />

        <h1 className="text-4xl font-bold leading-tight mb-[4rem] ml-[9rem]">
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

          <div className="grid grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-16 place-items-center text-center ml-[9rem]">
            {products.map(({ node: product }) => (
              <Link href={`/catalog/${catalogSlug}/${product.productSlug}`}>
                <Image
                  src={product.image[0]?.url}
                  alt={product.name}
                  width={120}
                  height={120}
                />
                {product.name}
              </Link>
            ))}
            {pageInfo.hasNextPage && (
              <More
                size={100}
                currentCursor={pageInfo.endCursor}
                catalogSlug={catalogSlug}
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
    fallback: "blocking", // or 'true' if you want to use fallback rendering
  };
}

export async function getStaticProps({ params }) {
  const { catalogSlug, catalogName } = params;
  const {
    productsConnection: { edges, pageInfo },
  } = await fetchInitialProductsConnection(100, catalogSlug);

  const catalogs = await fetchCatalogs();
  return {
    props: {
      catalogs,
      catalogSlug,
      products: edges || [],
      pageInfo,
    },
    revalidate: 60, // Optional: Set a revalidation time in seconds
  };
}

export default Catalog;
