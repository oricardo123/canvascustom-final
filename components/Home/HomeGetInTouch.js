import Link from "next/link";
//import "../tailwind.css";

export default function HomeGetInTouch() {
  return (
    <>
      <div className="flex justify-center text-center text-[2.81rem]/[3.8rem] font-bold w-auto md:mx-[9rem] xs:mx-[1rem]">
        Get in touch with us to start your custom furniture project today.
      </div>
      <div className="flex justify-center">
        <Link
          href="/contact"
          className="connect-with-us-btn text-white px-5 py-2 rounded-md mb-[10.5rem] mt-[4rem]"
        >
          Connect With Us
        </Link>
      </div>
    </>
  );
}
