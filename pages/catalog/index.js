// pages/catalog/index.js
import Link from "next/link";
import { fetchCatalogs } from "../../lib/fetchCatalogs";

function CatalogList({ catalogs }) {
  console.log("catalogs", catalogs);
  return (
    <div>
      <h1>Catalogs</h1>
      <ul>
        {catalogs.map((catalog) => (
          <li key={catalog.catalogSlug}>
            <Link href={`/catalog/${catalog.catalogSlug}`}>
              <img src={catalog.image.url} />
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

  return {
    props: {
      catalogs,
    },
    revalidate: 60, // Optional: Set a revalidation time in seconds
  };
}

export default CatalogList;
