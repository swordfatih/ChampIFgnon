import { useEffect } from "react";
import { MoveUpRight } from "lucide-react";
import { useParams } from "react-router-dom";

import type { CompleteGame, Game } from "@/types/game";

export default function Game() {
  const params = useParams();

  const Agame: Game = {
    name: "Minecraft",
    url: "https://www.minecraft.net/fr-fr",
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.F0mIB5kWOldDWtdyWipr2AHaD3%26pid%3DApi&f=1&ipt=68cfe4fac7b5ba392822e4465ba3654c98a1113f757d2c727b7f7da91df6e512&ipo=images",
    description: "Un jeu d'aventure cubique",
  };

  const game: CompleteGame = {
    url: "wikidata/unrailed",
    name: "Unrailed!",
    logo: '', //"https://cdn.cloudflare.steamstatic.com/steam/apps/1016920/header.jpg?t=1701377307",
    date: "2020",
    website: "https://unrailed-game.com/",
    platformURI: ["platform URI"],
    platformName: ["platformName"],
    gameModeName: "Coop",
    genreName: ["Action", "Indie", "Coop", "Must-play"],
    distributorURI: "distib URI",
    distributorName: "steam",
    developerURI: "dev URI",
    developerName: "Indoor Astronaut",
    publisherURI: "Daedlic URI",
    publisherName: "Daedlic Entertainment",
  };

  useEffect(() => {});

  return (
    <main className="layout min-h-screen w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
      <section className="container px-4 py-12 md:px-6 md:pt-8 lg:pt-16 xl:pt-24">
        <div className="grid items-center gap-4">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text pb-4 text-3xl font-bold italic tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
              {game.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-2 md:pt-4 lg:pt-8 xl:pt-12">
        <div className="flex h-full w-full overflow-hidden rounded-md p-4">
          {game.logo && (
            <div className="mx-1 my-1 mb-3.5 h-1/2 w-1/2">
              <img className="h-full w-full" src={game.logo} />
            </div>
          )}
          {!game.logo && (
            <div className="mx-1 my-1 mb-3.5 h-1/2 w-1/2">
              <img className="h-full w-full" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedias.pourlascience.fr%2Fapi%2Fv1%2Fimages%2Fview%2F5a82a9828fe56f22555a9551%2Fwide_1300%2Fimage.jpg&f=1&nofb=1&ipt=2a5d40a1c72699aefe23a568ab386871cbf08d7bf8ba8bf7f2f0e70d0ffd8276&ipo=images" />
            </div>
          )}

          <div className="mx-1 my-1 mb-3.5 h-1/2 w-1/2 flex-col">
            {game.website && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Site web : </b>{" "}
                <a href={game.website} target="blank">
                  {game.website}
                </a>
              </p>
            )}
            {game.date && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Date de sortie : </b> {game.date}
              </p>
            )}
            {game.genreName.length != 0 && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Genre : </b>{" "}
                {game.genreName.slice(0,-1).map((genre) => (
                  <span>{genre}, </span>
                ))}
                <span>{game.genreName.slice(-1)}</span>
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
