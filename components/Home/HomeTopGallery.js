import Link from "next/link";
import Image from "next/image";
import img1 from "../../public/images/canvas-image-3.png";
import img2 from "../../public/images/canvas-image-2.png";

export default function HomeTopGallery() {
  return (
    <div className="my-32 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <div className="flex flex-col ml-20 items-start text-left">
        <h1 className="text-gray-400 font-extrabold text-[30px] my-4 max-w-[200rem]">
          transforming spaces with canvas customisation of pieces with emotion &
          joy.
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-4 mt-8">
          <Link href="/collection" legacyBehavior>
            <a className="outline outline-1 text-gray-400 p-2 rounded-md text-lg font-bold hover:bg-gray-200 transition duration-150">
              View Collection
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="outline outline-1 outline-gray text-gray-400 p-2 rounded-md text-lg font-bold hover:bg-gray-100 transition duration-150">
              Learn More
            </a>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <Image
            src={img2}
            alt="Picture"
            width={500}
            height={300}
            className="rounded-2xl"
          />
        </div>
        <div>
          <Image
            src={img1}
            alt="Picture"
            width={500}
            height={300}
            className="rounded-2xl mt-[-4rem] mr-[32rem]"
          />
        </div>
      </div>
    </div>
  );
}
