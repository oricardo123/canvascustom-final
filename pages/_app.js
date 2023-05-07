import Navbar from "@/components/Navigation/NavBar";
import Footer from "@/components/Navigation/Footer";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
