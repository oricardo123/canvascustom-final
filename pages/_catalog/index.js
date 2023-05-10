import Link from "next/link";
import Image from "next/image";
import { fetchCatalogs } from "../../lib/fetchCatalogs";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
function CatalogPage({ catalogs }) {
  return (
    <div className="mt-24 mb-[8.74rem]">
      <Breadcrumbs items={[{ label: "Catalog", href: "/catalog" }]} />

      <h1 className="text-4xl font-bold leading-tight mb-[4rem] ml-[9rem] mt-10">
        Catalog
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 place-items-center text-center mx-24">
        {catalogs.map((catalog) => (
          <Link
            key={catalog.catalogSlug}
            href={`/catalog/${catalog.catalogSlug}`}
          >
            <div className="image-wrapper w-[10.9rem] h-[10.9rem]">
              <Image
                src={catalog.image.url}
                alt={catalog.name}
                width={224}
                height={224}
              />
              {catalog.name}
            </div>
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
