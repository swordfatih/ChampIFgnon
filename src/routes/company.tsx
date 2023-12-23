import { useSearchCompany } from "@/services/api/company";
import { useFindBestGames } from "@/services/api/creator";
import { useParams } from "react-router-dom";

import type { Company } from "@/types/company";
import GameCard from "@/components/gameCard";
import { Property } from "@/components/property";
import PropertyLink from "@/components/propertyLink";

export default function Company() {
  const { id } = useParams();

  const { data: company } = useSearchCompany(id);
  const { data: bestGames } = useFindBestGames(id);

  return (
    <>
      <section className="container px-4 py-12 md:px-6 md:pt-8 lg:pt-16 xl:pt-24">
        <div className="grid items-center gap-4">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <PropertyLink
              link={company?.website}
              value={company?.name}
              additional="bg-gradient-to-r gap-4 from-white to-gray-500 bg-clip-text px-2 pb-4 text-3xl font-bold italic tracking-tighter text-transparent sm:text-5xl xl:text-6xl"
            />
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-2 md:pt-4 lg:pt-8 xl:pt-12">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-md p-4 sm:flex-row">
          <div className="m-1 mb-3.5 h-1/2 w-full overflow-hidden rounded sm:w-1/3">
            <img
              className="h-full w-full"
              src={company?.logo ?? "/ChampIFgnon/assets/not_found.jpg"}
            />
          </div>

          <div className="px m-1 mb-3.5 flex h-1/2 w-full flex-wrap gap-3 p-2 sm:w-1/2">
            <Property
              title="Creation date"
              data={company?.inception}
              render={(item) => new Date(item).toLocaleDateString()}
            />
            <Property title="City" data={company?.city} />
            <Property title="Country" data={company?.country} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {bestGames && (
            <p className="center mx-2 text-center text-xl font-bold text-gray-300 group-hover:text-white">
              Best three games
            </p>
          )}
          <div className="cards grid items-center gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {bestGames?.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
        </div>
      </section>
    </>
  );
}
