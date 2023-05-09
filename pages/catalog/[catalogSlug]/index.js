import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../../components/Navigation/Breadcrumbs.js";
import More from "../../../components/More.jsx";
import { fetchCatalogs } from "../../../lib/fetchCatalogs";
import { fetchInitialProductsConnection } from "@/lib/fetchInitialProductsConnection";

function Catalog({ catalogs, catalogSlug, products, pageInfo }) {
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
            {products.map(({ node: product }) => (
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
                size={96}
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
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { catalogSlug, catalogName } = params;
  const {
    productsConnection: { edges, pageInfo },
  } = await fetchInitialProductsConnection(96, catalogSlug);

  const catalogs = await fetchCatalogs();
  return {
    props: {
      catalogs,
      catalogSlug,
      products: edges || [],
      pageInfo,
    },
    revalidate: 60,
  };
}

export default Catalog;
