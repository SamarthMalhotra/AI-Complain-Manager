import ComplaintPage from "./ComplaintPage";
import Navbar from "../Navbar";
import Brands from "./Brands";
import About from "./About.tsx";
import Footer from "./Footer.tsx";
const Home = () => {
  return (
    <>
      {" "}
      <Navbar />
      <ComplaintPage />
      <Brands />
      <About />
      <Footer />
    </>
  );
};
export default Home;
