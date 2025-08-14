import Navbar from "../components/Navbar";
import WelcomeText from "../components/WelcomeText";
import Subscribe from "../components/Subscribe";
import FinalText from "../components/FinalText";

export default function Homepage() {
  return (
    <div className="py-30">
      <Navbar />
      <div className="mx-auto my-16 max-w-[1080px] space-y-3">
        <p className="text-6xl">Welcome to Custom F1 Calendar!</p>
        <div className="bg-red h-2 w-3/4 rounded-r-full"></div>
      </div>
      <WelcomeText />
      <div className="mx-auto my-16 max-w-[1080px]">
        <Subscribe />
      </div>
      <FinalText />
    </div>
  );
}
