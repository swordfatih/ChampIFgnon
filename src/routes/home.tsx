import "@/styles/layout.css";

import React, { useEffect, useState } from "react";
import { useSearchGames } from "@/services/api/games";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FlameKindling,
  Mouse,
  Trash,
} from "lucide-react";
import { BiMessageSquareError } from "react-icons/bi";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useSearchParams } from "react-router-dom";

import { useFilters } from "@/hooks/use-filters";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import AdvancedSearch from "@/components/advancedSearch";
import GameCard from "@/components/gameCard";

export default function Home() {
  const featuresRef = React.useRef<HTMLDivElement>(null);

  const [advanced, setAdvanced] = useState(false);

  const params = useSearchParams();
  const [search, setSearch] = useSearchParamsState("search", params);
  const [offset, setOffset] = useSearchParamsState("offset", params, 0);

  const filters = useFilters(params);

  const {
    data: games,
    isLoading: gamesLoading,
    isError: gamesError,
  } = useSearchGames({
    search,
    offset,
    filters,
  });

  useEffect(() => {
    if (filters && filters.some((value) => !!value.state[0])) {
      setAdvanced(true);
    }
  }, [filters]);

  useEffect(() => {
    const anchor = window.location.hash.slice(1);

    if (games && anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [games]);

  return (
    <>
      <section className="container px-4 py-12 md:px-6 md:pt-24 lg:pt-32 xl:pt-48">
        <img
          src="/ChampIFgnon/assets/logo.png"
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

            <div className="relative mx-auto flex w-1/2 max-w-xs rounded-xl border border-zinc-700 p-1 text-zinc-200 shadow-md duration-300 hover:shadow-black sm:max-w-full">
              <p className="flex grow cursor-pointer items-center gap-2 rounded-md bg-white/5 px-2 py-3 font-mono hover:bg-white/10">
                <span className="text-orange-500">$</span>

                <input
                  className="w-full truncate bg-transparent"
                  value={search ?? ""}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </p>
            </div>

            {advanced && (
              <div className="flex flex-col gap-4">
                {filters.map(({ id, state, data, label }, index) => (
                  <AdvancedSearch
                    key={id}
                    data={data}
                    placeholder={label}
                    onSelect={(result) =>
                      state[1](result?.value.split("/").slice(-1)[0] ?? "")
                    }
                    value={state[0]}
                    z={20 - index}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <button
                className="flex items-center rounded-full border border-zinc-700 px-6 py-3 duration-300 hover:bg-white/10 hover:shadow-md hover:shadow-black"
                style={{
                  backgroundColor: advanced ? "#555555" : "transparent",
                }}
                onClick={() => setAdvanced(!advanced)}
              >
                <FlameKindling className="mr-2 h-5 w-5" />
                Recherche avancée
              </button>

              <Link
                to="/"
                reloadDocument
                className="flex items-center rounded-full border border-zinc-700 px-6 py-3 duration-300 hover:bg-white/10 hover:shadow-md hover:shadow-black"
              >
                <Trash className="mr-2 h-5 w-5 " />
                Effacer la recherche
              </Link>
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

      <section ref={featuresRef} className="container mt-10" id="results">
        <h2 className="mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-center text-xl font-bold tracking-tighter text-transparent sm:text-3xl xl:text-4xl">
          Jeux
          <p className="font-mono text-sm">
            (résultats de {offset} à {(offset ?? 0) + 12})
          </p>
        </h2>
        <div className="mt-12 flex items-center justify-center gap-12">
          <button
            className="flex animate-bounce justify-center text-zinc-600 duration-150 hover:text-white"
            onClick={() => {
              offset !== undefined && setOffset(offset <= 0 ? 0 : offset - 12);
            }}
          >
            <ArrowLeftIcon strokeWidth={1} className="h-10 w-10" />
          </button>
          <button
            className="flex animate-bounce justify-center text-zinc-600 duration-150 hover:text-white"
            onClick={() => {
              offset !== undefined && setOffset(offset + 12);
            }}
          >
            <ArrowRightIcon strokeWidth={1} className="h-10 w-10" />
          </button>
        </div>
        {gamesLoading && (
          <div className="flex w-full justify-center">
            <div className="w-fit">
              <InfinitySpin width="200" color="#f9f9f9" />
            </div>
          </div>
        )}
        {(gamesError || !games || games.length === 0) && !gamesLoading && (
          <div className="flex w-full justify-center">
            <div className="flex w-fit flex-col items-center justify-center text-center">
              <BiMessageSquareError size={40} color="red" />
              <p className="text-gray-400">Nothing found.</p>
            </div>
          </div>
        )}
        <div className="cards grid items-center gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {games?.map((game) => (
            <GameCard key={game.id + game.logo} game={game} />
          ))}
        </div>
      </section>
    </>
  );
}
