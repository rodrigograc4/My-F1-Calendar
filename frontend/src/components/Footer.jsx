import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <footer className="bg-off-white mt-30 px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1600px] py-12">
        <p>
          This website is a fan-made project and is not affiliated with Formula
          1, FIA, Liberty Media or any other official entity.
        </p>
        <a href="https://github.com/rodrigograc4" target="_blank">
          <GitHubIcon className="my-6" />
        </a>
        <p>© 2025 My F1 Calendar. All rights reserved.</p>
      </div>
    </footer>
  );
}
