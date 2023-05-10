import Link from "next/link";
import Image from "next/image";
import { getClient } from "@/lib/client";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { GET_CATALOGS } from "@/graphql/queries";

export default async function Catalogs({ params }) {
  const client = getClient();

  const {
    data: { catalogs },
  } = await client.query({
    query: GET_CATALOGS,
  });

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
