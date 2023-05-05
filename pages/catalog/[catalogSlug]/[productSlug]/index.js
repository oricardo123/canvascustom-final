import { fetchCatalogs } from "../../../../lib/fetchCatalogs";
import { fetchProductsByCatalog } from "../../../../lib/fetchProductsByCatalog";
import { fetchProduct } from "../../../../lib/fetchProduct";
import Parser, { domToReact } from "html-react-parser";

function Product({ product: { name, description, image } }) {
  const options = {
    replace: ({ attribs, children, name }) => {
      if (name === "li") {
        return (
          <li className="list-disc ml-5">{domToReact(children, options)}</li>
        );
      }
    },
  };

  return (
    <div>
      <h2 className="mt-20 ml-10">{name}</h2>
      {image
        .filter((img) => img.fileName.includes("w300"))
        .map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.fileName}
            className="mt-20 ml-10"
          />
        ))}
      <div className="mt-4 prose prose-sm ml-10">
        {Parser(description, options)}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const catalogs = await fetchCatalogs();
  const paths = [];

  for (const catalog of catalogs) {
    const products = await fetchProductsByCatalog(catalog.catalogSlug);

    for (const product of products) {
      paths.push({
        params: {
          catalogSlug: catalog.catalogSlug,
          productSlug: product.productSlug,
        },
      });
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { productSlug } = params;
  const product = await fetchProduct(productSlug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
}

export default Product;
