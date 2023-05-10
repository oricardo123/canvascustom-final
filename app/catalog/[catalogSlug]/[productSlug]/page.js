import Image from "next/image";
import Parser, { domToReact } from "html-react-parser";
import { getClient } from "@/lib/client";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { GET_PRODUCT } from "@/graphql/queries";

export default async function Product({
  params: { catalogSlug, productSlug },
}) {
  const client = getClient();
  console.log(catalogSlug);
  console.log(productSlug);

  const options = {
    replace: ({ attribs, children, name }) => {
      if (name === "li") {
        return (
          <li className="list-disc ml-5">{domToReact(children, options)}</li>
        );
      }
    },
  };

  const {
    data: {
      product: { name, image, description },
    },
  } = await client.query({
    query: GET_PRODUCT,
    variables: { productSlug },
  });

  return (
    <div className="mt-24">
      <Breadcrumbs
        items={[
          { label: "Catalog", href: "/catalog" },
          {
            label: catalogSlug.charAt(0).toUpperCase() + catalogSlug.slice(1),
            href: `/catalog/${catalogSlug}`,
          },
          {
            label: productSlug.toUpperCase(),
            href: `/catalog/${catalogSlug}/${productSlug}`,
          },
        ]}
      />
      <h1 className="text-4xl font-bold leading-tight mb-[4rem] ml-[9rem] mt-10">
        Catalog
      </h1>
      <div className="flex ml-40">
        <h2 className="mt-20 ml-40">{name}</h2>
        {image
          .filter((img) => img.fileName.includes("w300"))
          .map((img) => (
            <Image
              src={img.url}
              alt={img.fileName}
              height={330}
              width={300}
              className="mt-20 ml-10"
            />
          ))}
      </div>
      <div className="mt-14 ml-[22rem]">{Parser(description, options)}</div>
    </div>
  );
}
