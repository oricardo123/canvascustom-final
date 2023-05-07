import { fetchCatalogs } from "../../../lib/fetchCatalogs";
import { fetchProductsByCatalog } from "../../../lib/fetchProductsByCatalog";
import Breadcrumbs from "../../../components/Navigation/Breadcrumbs.js";
import Link from "next/link";
import Image from "next/image";
import CatalogNav from "@/components/Navigation/CatalogNav";

function Catalog({ catalogs, catalogSlug, products }) {
  return (
    <>
      <div className="mt-20">
        <h1>{catalogSlug}</h1>
        <div className="w-full">
          <Breadcrumbs
            items={[
              { label: "Catalog", href: "/catalog" },
              { label: catalogSlug, href: `/catalog/${catalogSlug}` },
            ]}
          />
        </div>
        <ul className="">
          {catalogs?.map((catalog) => (
            <li>
              <Link href={`/catalog/${catalog.catalogSlug}`}>
                {catalogSlug === catalog.name.toLowerCase() ? (
                  <b>{catalog.name}</b>
                ) : (
                  catalog.name
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 place-items-center text-center">
          {products.map((product) => (
            <Link href={`/catalog/${catalogSlug}/${product.productSlug}`}>
              <Image
                src={product.image[0].url}
                alt={product.name}
                width={120}
                height={120}
                className=""
              />
              {product.name}
            </Link>
          ))}
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
  const products = await fetchProductsByCatalog(catalogSlug);
  const catalogs = await fetchCatalogs();
  return {
    props: {
      catalogs,
      catalogSlug,
      products: products || [],
    },
    revalidate: 60, // Optional: Set a revalidation time in seconds
  };
}

export default Catalog;
