import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="min-h-screen scroll-smooth antialiased">
      <main className="layout min-h-screen w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
        <Link
          className="flex w-full items-center justify-start gap-2 p-4"
          to="/"
        >
          <img
            src="/assets/logo.png"
            alt="MIFcromania logo"
            height={25}
            width={25}
            className="animate-[spin_5s_linear_infinite]"
          />
          <h1 className="bg-gradient-to-r from-white to-black bg-clip-text text-sm font-bold tracking-tighter text-transparent">
            M'IF'cromania
          </h1>
        </Link>
        <Outlet />
        <footer className="container mt-10 grid place-items-center pb-4 text-neutral-400">
          <span className="flex items-center gap-1">
            &copy;
            <span>{new Date().getFullYear()}</span>
            <a
              href="https://github.com/rajput-hemant"
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
