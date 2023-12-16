import { Play } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="min-h-screen scroll-smooth antialiased">
      <main className="layout min-h-screen w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
        <div className="flex w-full items-center justify-between p-4">
          <Link className="flex items-center justify-start gap-2" to="/">
            <img
              src="/ChampIFgnon/assets/logo.png"
              alt="MIFcromania logo"
              height={25}
              width={25}
              className="animate-[spin_5s_linear_infinite]"
            />
            <h1 className="bg-gradient-to-r from-white to-black bg-clip-text text-sm font-bold tracking-tighter text-transparent">
              M'IF'cromania
            </h1>
          </Link>
          <Link
            to="/quiz"
            className="flex items-center gap-1 bg-gradient-to-r from-gray-800 to-white bg-clip-text text-sm font-bold tracking-tighter text-transparent"
          >
            <Play className="mr-2 h-4 w-4" color="#555555" />
            Guess the date!
          </Link>
        </div>
        <Outlet />
        <footer className="container mt-10 grid place-items-center pb-4 text-neutral-400">
          <span className="flex items-center gap-1">
            &copy;
            <span>{new Date().getFullYear()}</span>
            <a
              href="https://github.com/swordfatih/ChampIFgnon"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 duration-200 hover:text-white hover:underline"
            >
              Hexanome 2 - 4IF
            </a>
          </span>
        </footer>
      </main>
    </div>
  );
};

export default RootLayout;
