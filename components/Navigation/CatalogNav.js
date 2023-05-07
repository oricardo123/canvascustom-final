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
              <img src={catalog.image.url} className="" />
              {catalog.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const catalogs = await fetchCatalogs();
  console.log("catalogs", catalogs);
  return {
    props: {
      catalogs,
    },
    revalidate: 1,
  };
}

export default CatalogNav;
