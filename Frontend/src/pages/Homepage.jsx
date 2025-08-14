import Navbar from "../components/Navbar";
import WelcomeText from "../components/WelcomeText";
import Subscribe from "../components/Subscribe";
import FinalText from "../components/FinalText";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-52 mb-16 max-w-[1080px]">
        <p className="text-6xl">Welcome to Custom F1 Calendar!</p>
      </div>
      <WelcomeText />
      <div className="mx-auto max-w-[1080px]">
        <Subscribe />
      </div>
      <FinalText />
    </div>
  );
}
