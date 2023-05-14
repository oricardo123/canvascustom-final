"use client"


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
