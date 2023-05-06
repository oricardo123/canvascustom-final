import Link from "next/link";
import Image from "next/image";
import img1 from "../../public/images/canvas-image-3.png";
import img2 from "../../public/images/canvas-image-2.png";

export default function HomeTopGallery() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 relative text-white">
        <div className="left-vector w-auto h-[45rem] relative scale-x-[-1] lg:mr-[-15rem] hidden md:block" />
        <div className="right-vector w-auto h-[49rem] ml-[-31rem] relative lg:ml-[-12rem]" />

        <h1 className="absolute max-w-[41rem]  mt-40 left-[10%] font-bold text-[45px] mr-3 z-50">
          Transform your space with our custom furniture solutions at Canvas
          Custom Furniture.
        </h1>
        <Link
          href="/catalog"
          className="absolute text-black bg-white mt-[32rem] md:mt-[25rem] left-[10%] p-2 mix-blend-screen rounded-md text-lg font-bold z-50"
        >
          View Catalog
        </Link>
        <Link
          href="/about"
          className="absolute mt-[32rem] md:mt-[25rem] left-[10%] ml-[10rem] p-[0.4rem] outline rounded-md text-lg font-bold z-50"
        >
          Learn More
        </Link>

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
}
