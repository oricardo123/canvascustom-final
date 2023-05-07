import Link from "next/link";
import { fetchCatalogs } from "../../lib/fetchCatalogs";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import Image from "next/image";

function CatalogPage({ catalogs }) {
  return (
    <div className="my-24">
      <h1 className="text-4xl font-bold leading-tight mb-[4rem] ml-[9rem]">
        Catalog
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 place-items-center text-center">
        {catalogs.map((catalog) => (
          <Link
            href={`/catalog/${catalog.catalogSlug}`}
            className="w-[10.9rem] h-[10.9rem]"
          >
            <div className="image-wrapper">
              <Image
                src={catalog.image.url}
                alt={catalog.name}
                width={224}
                height={224}
              />
            </div>
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
    revalidate: 60,
  };
}

export default CatalogPage;
