import { useFindCreators, useFindGame } from "@/services/api/games";
import { useFindMultipleProperty } from "@/services/api/object";
import { BookOpenText, Calendar, Link } from "lucide-react";
import { useParams } from "react-router-dom";

import { getSteamImage } from "@/lib/steam";
import CreatorLink from "@/components/creator";
import PropertyLink from "@/components/propertyLink";
import { PropertyList } from "@/components/propertyList";
import Rating from "@/components/rating";
import { SearchLink } from "@/components/searchLink";

export default function Game() {
  const { id } = useParams();

  const { data: game } = useFindGame(id);
  const { data: publishers } = useFindCreators(id, "P123");
  const { data: developers } = useFindCreators(id, "P178");
  const { data: genres } = useFindMultipleProperty(id, "P136");
  const { data: platforms } = useFindMultipleProperty(id, "P400");
  const { data: distributors } = useFindMultipleProperty(id, "P750");
  const { data: languages } = useFindMultipleProperty(id, "P407");
  const { data: countries } = useFindMultipleProperty(id, "P495");
  const { data: mechanisms } = useFindMultipleProperty(id, "P4151");

  return (
    <>
      <section className="container px-4 py-12 md:px-6 md:pt-8 lg:pt-16 xl:pt-24">
        <div className="grid items-center gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <PropertyLink
              link={game?.website}
              value={game?.name}
              additional="bg-gradient-to-r gap-4 from-white to-gray-500 bg-clip-text px-2 pb-4 text-3xl font-bold italic tracking-tighter text-transparent sm:text-5xl xl:text-6xl"
            />

            {game?.description && (
              <p className="flex items-center gap-2 text-2xl text-gray-300 group-hover:text-white">
                <BookOpenText />
                {game.description}
              </p>
            )}

            {game?.date && (
              <div className="flex gap-2 text-xl text-gray-300 group-hover:text-white">
                <Calendar />
                {new Date(game?.date).toLocaleDateString()}
              </div>
            )}

            {game?.score && (
              <div className="flex gap-2 text-xl text-gray-300 group-hover:text-white">
                <a
                  className="flex items-center gap-2 text-blue-600 underline"
                  href={`https://opencritic.com/game/${game?.critId}/-`}
                  target="_blank"
                >
                  <Rating
                    value={(parseInt(game.score) * 5) / 100}
                    color="yellow"
                    size={20}
                  />
                  <Link width={16} height={16} color="cyan" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-2 md:pt-4 lg:pt-8 xl:pt-12">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-md p-4 sm:flex-row">
          <div className="m-1 mb-3.5 h-1/2 w-full overflow-hidden  rounded sm:w-1/2">
            <img
              className="h-full w-full object-cover "
              src={
                getSteamImage(game?.steamId) ??
                game?.logo ??
                "/assets/not_found.jpg"
              }
            />
          </div>

          <div className="px m-1 mb-3.5 flex h-1/2 w-full flex-wrap gap-3 p-2 sm:w-1/2">
            <PropertyList
              title="Publishers"
              data={publishers}
              render={(item) => <CreatorLink item={item} />}
            />
            <PropertyList
              title="Developers"
              data={developers}
              render={(item) => <CreatorLink item={item} />}
            />
            <PropertyList
              title="Genres"
              data={genres}
              render={(item) => <SearchLink type="genre" item={item} />}
            />
            <PropertyList title="Countries of origin" data={countries} />
            <PropertyList
              title="Platforms"
              data={platforms}
              render={(item) => <SearchLink type="platform" item={item} />}
            />
            <PropertyList title="Distributors" data={distributors} />
            <PropertyList
              title="Languages"
              data={languages}
              render={(item) => <SearchLink type="language" item={item} />}
            />
            <PropertyList
              title="Mechanisms"
              data={mechanisms}
              render={(item) => <SearchLink type="mechanism" item={item} />}
            />
          </div>
        </div>
      </section>
    </>
  );
}
