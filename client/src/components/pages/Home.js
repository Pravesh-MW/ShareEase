import Footer from "../Footer";
import Card from "../card";

function Home() {
  return (
    <>
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-black py-10">Welcome to ShearEasy: Hassle free File Shearing</h1>
    </div>
      <div className="flex w-full h-2/3 justify-center items-center space-x-4 px-4">
        <Card heading="Upload your file" button="Get Started" />
        <Card heading="Download your file" button="Get Started" />
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
