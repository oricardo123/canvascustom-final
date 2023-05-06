import { fetchCatalogs } from "../../../lib/fetchCatalogs";
import { fetchProductsByCatalog } from "../../../lib/fetchProductsByCatalog";
import Breadcrumbs from "../../../components/Navigation/Breadcrumbs.js";
import Link from "next/link";
import Image from "next/image";

function Catalog({ catalogSlug, products }) {
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

        {products.map((product) => (
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 place-items-center text-center">
          <Link href={`/catalog/${catalogSlug}/${product.productSlug}`}>
            <div className="image-wrapper">
              <Image
                src={product.image[0].url}
                alt={product.name}
                width={120}
                height={120}
                className=""
              />
            </div>
            {product.name}
          </Link>
          </div>
        ))}
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
  return {
    props: {
      catalogSlug,
      products: products || [],
    },
    revalidate: 60, // Optional: Set a revalidation time in seconds
  };
}

export default Catalog;
