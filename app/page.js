import HomeTopGallery from "../components/Home/HomeTopGallery";
import HomeContainer2 from "../components/Home/HomeContainer2";
import HomeContainer3 from "../components/Home/HomeContainer3";
import TailoredToPerfection from "../components/Home/TailoredToPerfection";
import GetInTouchHeading from "../components/Home/HomeGetInTouch";
import "../styles/globals.css";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Canvas Custom Furniture</title>
      </Head>
      <HomeTopGallery />
      <HomeContainer2 />
      <HomeContainer3 />
      <TailoredToPerfection />
      <GetInTouchHeading />
    </>
  );
};

export default Home;
