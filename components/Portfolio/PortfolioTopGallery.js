import Image from "next/image";
import img1 from "../../public/images/canvas-image-3.png";
import img2 from "../../public/images/canvas-image-2.png";

const PortfolioTopGallery = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 relative text-white">
        <div className="left-vector w-auto h-[45rem] relative scale-x-[-1] lg:mr-[-15rem] hidden md:block" />
        <div className="right-vector w-auto h-[49rem] ml-[-31rem] relative lg:ml-[-12rem]" />

        <h1 className="absolute max-w-[41rem] mt-40 left-[10%] font-extrabold text-[45px] mr-3 z-50">
          Discovering The Craftmanship
        </h1>
        <p className="absolute max-w-[41rem] mt-56 left-[10%] font-extrabold text- mr-3 z-50">
          At Canvas Custom, we take great pride in our skilled furniture
          production team, who possess extensive experience in their craft. By
          relying on these experts, we are able to craft a diverse range of
          furniture pieces, from our standard in-house collection to intricate,
          customized projects.
        </p>
        <Image
          src={img2}
          alt="Picture"
          className="absolute right-[5%] bottom-[48%] w-auto rounded-2xl hidden lg:block"
        />
        <Image
          src={img1}
          alt="Picture"
          className="absolute z-10 right-[15%] bottom-[15%] w-auto rounded-2xl hidden lg:block"
        />
      </div>
    </>
  );
};
export default PortfolioTopGallery;
