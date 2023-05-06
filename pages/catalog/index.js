// pages/catalog/index.js
import Link from "next/link";
import Image from "next/image";
import { fetchCatalogs } from "../../lib/fetchCatalogs";

function CatalogList({ catalogs }) {
  return (
    <div className="mt-24">
      <h1>Catalogs</h1>
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        {catalogs.map((catalog) => (
          <Link href={`/catalog/${catalog.catalogSlug}`}>
            <img src={catalog.image.url} className="" />
            {catalog.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const catalogs = await fetchCatalogs();

  return {
    props: {
      catalogs,
    },
    revalidate: 60, // Optional: Set a revalidation time in seconds
  };
}

export default CatalogList;
