import Navbar from "../components/Navbar";
import WelcomeText from "../components/WelcomeText";
import Subscribe from "../components/Subscribe";
import FinalText from "../components/FinalText";
import Footer from "../components/Footer";
import { useRef } from "react";

export default function Homepage() {
  const subscribeRef = useRef(null);

  const handleSubscribeClick = () => {
    if (subscribeRef.current) {
      const offsetTop =
        subscribeRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 175,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="pt-30">
      <Navbar onSubscribeClick={handleSubscribeClick} />

      <div className="px-6 md:px-10 lg:px-14">
        <div className="mx-auto my-16 max-w-[1080px] space-y-3">
          <p className="text-6xl">Welcome to My F1 Calendar!</p>
          <div className="bg-red h-2 w-2/3 rounded-r-full"></div>
        </div>

        <WelcomeText />

        <div ref={subscribeRef} className="mx-auto my-16 max-w-[1080px]">
          <Subscribe />
        </div>

        <FinalText />
      </div>
      <Footer />
    </div>
  );
}
