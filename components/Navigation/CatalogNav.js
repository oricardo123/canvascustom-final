// pages/catalog/index.js
import Link from "next/link";
import Image from "next/image";
import { fetchCatalogs } from "../../lib/fetchCatalogs";

function CatalogNav({ catalogs }) {
  return (
    <div className="mt-24">
      <h1>Catalogs</h1>
      <ul className="">
        {catalogs?.map((catalog) => (
          <li>
            <Link href={`/catalog/${catalog.catalogSlug}`}>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const catalogs = await fetchCatalogs();
  return {
    props: {
      catalogs,
    },
    revalidate: 1,
  };
}

export default CatalogNav;
