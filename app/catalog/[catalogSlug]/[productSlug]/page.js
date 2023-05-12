import Image from "next/image";
import Parser, { domToReact } from "html-react-parser";
import { getClient } from "@/lib/client";
import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
import { GET_PRODUCT, GET_CATALOGS } from "@/graphql/queries";

export default async function Product({
  params: { productSlug, catalogSlug },
}) {
  const client = getClient();
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

  const {
    data: { catalogs },
  } = await client.query({
    query: GET_CATALOGS,
  });

  const { specImages, specDimensions } = catalogs.filter(
    (catalog) => catalog.catalogSlug === catalogSlug
  )[0];
  return (
    <>
      <div className="mb-[6.49rem]">
        <div className="mt-20">
          <Breadcrumbs
            items={[
              { label: "Catalog", href: "/catalog" },
              {
                label:
                  catalogSlug.charAt(0).toUpperCase() + catalogSlug.slice(1),
                href: `/catalog/${catalogSlug}`,
              },
              {
                label: productSlug.toUpperCase(),
                href: `/catalog/${catalogSlug}/${productSlug}`,
              },
            ]}
          />
        </div>
        <div className="flex flex-col lg:flex-row my-24 items-center justify-center">
          <div className="flex flex-col">
            {image
              .filter((img) => img.fileName.includes("w300"))
              .map((img) => (
                <Image
                  src={img.url}
                  alt={img.fileName}
                  height={330}
                  width={300}
                />
              ))}
            <div className="flex flex-wrap justify-center gap-x-3">
              {specImages.map((image, index) => (
                <div key={index} className="flex items-end">
                  <Image src={image.url} width={37} height={30} />
                  {specDimensions[index]}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col ml-10 mt-20 md:mt-0">
            <h1 className="text-4xl font-bold leading-tight ">{name}</h1>
            <div className="mt-14">{Parser(description, options)}</div>
          </div>
        </div>
      </div>
      <h1 className="mb-10 text-center">
        ALL APPROXIMATE METRIC DIMENSIONS - FOR EXACT SIZES, PLEASE CONTACT US
      </h1>
    </>
  );
}
