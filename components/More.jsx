"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";

const More = ({ pageInfo, catalogSlug, loadMoreProducts, loading }) => {
    const { hasNextPage } = pageInfo;
  
    return (
      <>
        {loading && (
          <div className="bg-white mb-4 p-4 rounded-md text-center">
            Loading...
          </div>
        )}
        {hasNextPage && (
          <button
            className="text-FooterColor bg-white my-14 p-2 rounded-md text-lg font-bold"
            onClick={loadMoreProducts}
          >
            Get More
          </button>
        )}
      </>
    );
  };
  
  export default More;
  


// import React, { useState } from "react";
// import { fetchProductsConnection } from "../lib/fetchProductsConnection";
// import Link from "next/link";
// import Image from "next/image";

// const More = ({ currentCursor, size = 1, catalogSlug }) => {
//   const [products, setProducts] = useState([]);
//   const [cursor, setCursor] = useState(currentCursor);
//   const [hasNext, setHasNext] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const getMore = async () => {
//     setLoading(true);
//     const { productsConnection } = await fetchProductsConnection(
//       cursor,
//       size,
//       catalogSlug
//     );
//     const { edges: productsArray, pageInfo } = productsConnection;
//     const productsArr = productsArray.map((product) => product.node);
//     setProducts([...products, ...productsArr]);
//     setCursor(pageInfo.endCursor);
//     setHasNext(pageInfo.hasNextPage);
//     setLoading(false);
//   };
//   return (
//     <>
//       {products.map((product) => (
//         <div
//           key={product.cursor}
//           className="prose bg-white  max-w-4xl mb-4 p-4 rounded-md"
//         >
//           <Link href={`/catalog/${catalogSlug}/${product.productSlug}`}>
//             <Image
//               src={product.image[0]?.url}
//               alt={product.name}
//               width={120}
//               height={120}
//             />
//             {product.name}
//           </Link>
//         </div>
//       ))}
//       {loading && (
//         <div className="bg-white mb-4 p-4 rounded-md text-center">
//           Loading...
//         </div>
//       )}
//       {hasNext && (
//         <button
//           className="text-FooterColor bg-white my-14 p-2 rounded-md text-lg font-bold"
//           onClick={getMore}
//         >
//           Get More
//         </button>
//       )}
//     </>
//   );
// };

// export default More;
