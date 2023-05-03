import { fetchCatalogs } from "../../../lib/fetchCatalogs";
import { fetchProductsByCatalog } from "../../../lib/fetchProductsByCatalog";
import Link from "next/link";

function Catalog({ catalogSlug, products }) {
  return (
    <div>
      <h1>{catalogSlug}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            <Link href={`/catalog/${catalogSlug}/${product.productSlug}`}>
              <img src={product.image[0].url} />
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
  console.log("products", products);
  return {
    props: {
      catalogSlug,
      products: products || [],
    },
    revalidate: 60, // Optional: Set a revalidation time in seconds
  };
}

export default Catalog;
