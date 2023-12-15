import "@/styles/layout.css";

import React, { useState } from "react";
import { useSearchGames } from "@/services/api/games";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FlameKindling,
  Github,
  Mouse,
} from "lucide-react";

import GameCard from "@/components/gameCard";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const featuresRef = React.useRef<HTMLDivElement>(null);
  const cardWrapperRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const {
    data,
    isLoading: gamesLoading,
    isError: gamesError,
  } = useSearchGames(searchText, offset);

  const games = data?.results.bindings;

  React.useEffect(() => {}, []);

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
          {games?.map((game) => (
            <GameCard
              key={game.url.value}
              wrapper={cardWrapperRef}
              game={{
                url: game.url.value,
                description: game.description.value,
                name: game.name.value,
                logo: game.logo?.value,
              }}
            />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-12">
          <button
            className="flex animate-bounce justify-center text-zinc-600 duration-150 hover:text-white"
            onClick={() => {
              if (offset <= 0) {
                setOffset(0);
              } else {
                setOffset(offset - 12);
              }
            }}
          >
            <ArrowLeftIcon strokeWidth={1} className="h-10 w-10" />
          </button>
          <button
            className="flex animate-bounce justify-center text-zinc-600 duration-150 hover:text-white"
            onClick={() => setOffset(offset + 12)}
          >
            <ArrowRightIcon strokeWidth={1} className="h-10 w-10" />
          </button>
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
