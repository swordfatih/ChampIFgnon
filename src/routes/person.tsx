import React from "react";
import { useFindBestGames } from "@/services/api/creator";
import { useFindMultipleProperty } from "@/services/api/object";
import { useFindPerson } from "@/services/api/person";
import { useParams } from "react-router-dom";

import GameCard from "@/components/gameCard";

export default function Person() {
  const { id } = useParams();

  const { data: person } = useFindPerson(id);
  const { data: occupations } = useFindMultipleProperty(id, "P106");
  const { data: bestGames } = useFindBestGames(id);
  const cardWrapperRef = React.useRef<HTMLDivElement>(null);

  return (
    <main className="layout min-h-screen w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
      <section className="container px-4 py-12 md:px-6 md:pt-8 lg:pt-16 xl:pt-24">
        <div className="grid items-center gap-4">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text pb-4 text-3xl font-bold italic tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
              {person?.name}
            </h1>
            {person?.nativeName != person?.name && (
              <p className="mx-2 text-2xl text-gray-300 group-hover:text-white">
                {person?.nativeName}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-2 md:pt-4 lg:pt-8 xl:pt-12">
        <div className="flex h-full w-full overflow-hidden rounded-md p-4">
          {person?.image && (
            <div className="m-1 mb-3.5 h-1/2 w-1/3">
              <img className="h-full w-full" src={person?.image} />
            </div>
          )}
          {!person?.image && (
            <div className="m-1 mb-3.5 h-1/2 w-1/3">
              <img
                className="h-full w-full"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicturesofmaidenhead.files.wordpress.com%2F2019%2F01%2Fimage-not-found.jpg&f=1&nofb=1&ipt=c7f29bbe09abe700f04cd1938142fdf590986b85187de4571b91d75adfde5afd&ipo=images"
              />
            </div>
          )}

          <div className="m-1 mb-3.5 h-1/2 w-2/3 flex-col">
            {person?.dateBirth && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Birth date : </b>
                {new Date(person?.dateBirth).toLocaleDateString()}
              </p>
            )}
            <br />
            {person?.dateDeath && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Death date : </b>
                {new Date(person?.dateDeath).toLocaleDateString()}
              </p>
            )}
            <br />
            {occupations && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Occupations : </b>
              </p>
            )}
            {occupations?.map((occupation) => (
              <li className="mx-2 ml-12 text-xl text-gray-300 group-hover:text-white">
                {occupation.name}
              </li>
            ))}

            {person?.signature && (
              <div className="m-1 mb-3.5 h-1/2 w-1/2">
                <img
                  className="h-full w-full brightness-0 invert"
                  src={person?.signature}
                />
              </div>
            )}
            <br />
            {bestGames && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>List of games : </b>
              </p>
            )}
            <br />
            <div
              ref={cardWrapperRef}
              className="cards grid items-center gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
            >
              {bestGames?.map((game) => <GameCard key={game.id} game={game} />)}
            </div>
          </div>
        </div>
      </section>
      <section className="container px-4 py-12 md:px-6 md:pt-8 lg:pt-16 xl:pt-24"></section>
    </main>
  );
}
