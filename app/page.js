import HomeTopGallery from "../components/Home/HomeTopGallery";
import HomeContainer2 from "../components/Home/HomeContainer2";
import HomeContainer3 from "../components/Home/HomeContainer3";
import TailoredToPerfection from "../components/Home/TailoredToPerfection";
import GetInTouchHeading from "../components/Home/HomeGetInTouch";
import "../styles/globals.css";

//import "./Pagescss/Homepage.css";
const Home = () => {
  return (
    <>
      <HomeTopGallery />
      <HomeContainer2 />
      <HomeContainer3 />
      <TailoredToPerfection />
      <GetInTouchHeading />
    </>
  );
};
export default Home;
