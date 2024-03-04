import Navbar from "@/components/Navigation/NavBar";
import Footer from "@/components/Navigation/Footer";
import "../styles/globals.css";


export default function App({ Component, pageProps }) {
  console.log("this is the right folder")
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
