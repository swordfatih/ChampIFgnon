import "@/styles/layout.css";

import React, { useEffect, useState } from "react";
import { useSearchGames } from "@/services/api/games";
import { FlameKindling, Github, Mouse, MoveUpRight } from "lucide-react";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const featuresRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLAnchorElement[]>([]);
  const cardWrapperRef = React.useRef<HTMLDivElement>(null);

  const {
    data: games,
    isLoading: gamesLoading,
    isError: gamesError,
  } = useSearchGames(searchText);

  React.useEffect(() => {
    cardWrapperRef.current!.onmousemove = (e) => {
      for (const card of cardsRef.current) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
  }, []);

  useEffect(() => {
    console.log(games);
  }, [games]);

  return (
    <main className="layout w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
      <section className="container px-4 py-12 md:px-6 md:pt-24 lg:pt-32 xl:pt-48">
        <img
          src="/assets/logo.png"
          alt="MIFcromania logo"
          height={150}
          width={150}
          className="mx-auto mb-6 max-w-[100px] animate-[spin_5s_linear_infinite] md:max-w-full"
        />

        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="mb-6 space-y-2">
              <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
                M'IF'cromania
              </h1>

              <p className="mx-auto max-w-3xl text-sm text-zinc-200 sm:text-base md:text-xl">
                Retrouvez ici les meilleurs jeux de l'industrie vidéoludique !
              </p>
            </div>

            <div className="relative mx-auto w-1/2 max-w-xs rounded-xl border border-zinc-700 p-1 text-zinc-200 shadow-md duration-300 hover:shadow-black sm:max-w-full">
              <p className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-white/5 px-2 py-3 font-mono hover:bg-white/10">
                <span className="text-orange-500">$</span>

                <input
                  className="w-full truncate bg-transparent"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <a
                href="/search"
                className="flex rounded-full border border-zinc-700 px-6 py-3 duration-300 hover:bg-white/10 hover:shadow-md hover:shadow-black"
              >
                <FlameKindling className="mr-2 h-5 w-5" />
                Rechercher
              </a>

              <a
                href="https://github.com/swordfatih/ChampIFgnon/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex rounded-full border border-zinc-700 px-6 py-3 duration-300 hover:bg-white/10 hover:shadow-md hover:shadow-black"
              >
                <Github className="mr-2 h-5 w-5 " />
                Voir notre repo
              </a>
            </div>
          </div>
        </div>
      </section>

      <button
        className="mx-auto flex animate-bounce justify-center text-zinc-600 duration-150 hover:text-white"
        onClick={() =>
          featuresRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <Mouse strokeWidth={1} className="h-10 w-10" />
      </button>

      <section ref={featuresRef} className="container mt-10">
        <h2 className="mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-center text-xl font-bold tracking-tighter text-transparent sm:text-3xl xl:text-4xl">
          Jeux
        </h2>

        <div
          ref={cardWrapperRef}
          className="cards grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {gamesLoading && <div>Chargement...</div>}
          {gamesError && <div>Erreur !</div>}
          {games?.results.bindings.map((game, i) => (
            <a
              key={i}
              ref={(el) => (cardsRef.current![i] = el!)}
              href={game.url.value}
              target="_blank"
              rel="noopener noreferrer"
              className="card group relative h-48 w-full rounded-xl bg-zinc-700 shadow-md shadow-black outline-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-500 hover:shadow-xl hover:shadow-black hover:before:opacity-100"
            >
              <div className="absolute inset-[1px] z-[2] flex flex-col gap-2.5 rounded-xl bg-[#141414] p-2.5">
                <div className="relative h-full w-full overflow-hidden rounded-md p-4">
                  {game.logo && (
                    <div className="mb-3.5 h-14 w-14">
                      <img src={game.logo.value} />
                    </div>
                  )}

                  <h3 className="text-xl">
                    <div className="flex h-full w-full items-center after:absolute after:inset-0">
                      {game.name.value}

                      <MoveUpRight
                        strokeWidth={0.75}
                        className="ml-1 h-4 w-4 text-white"
                      />
                    </div>
                  </h3>

                  <p className="mt-2 text-sm text-gray-300 group-hover:text-white">
                    {game.description.value}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

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
  );
}
