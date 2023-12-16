import { MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { Game } from "@/types/game";
import { getSteamImage } from "@/lib/steam";
import Rating from "@/components/rating";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Link
      to={`/game/${game.id.split("/").slice(-1)}`}
      className="card group relative h-48 w-full rounded-xl bg-zinc-700 shadow-md shadow-black outline-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-500 hover:shadow-xl hover:shadow-black hover:brightness-50 hover:before:opacity-100"
    >
      <div
        className="absolute inset-[1px] z-[2] flex flex-col gap-2.5 rounded-xl bg-[#141414] bg-contain p-2.5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
            getSteamImage(game.steamId) ?? game.logo
          })`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-md p-4">
          <h3 className="text-xl">
            <div
              className="flex h-full w-full items-center after:absolute after:inset-0"
              style={{
                textShadow:
                  "0.07em 0 black, 0 0.07em black, -0.07em 0 black, 0 -0.07em black",
              }}
            >
              {game.name}

              <MoveUpRight
                strokeWidth={0.75}
                className="ml-1 h-4 w-4 text-white"
              />
            </div>
          </h3>

          <p
            className="mt-2 text-sm text-gray-300 group-hover:text-white"
            style={{
              textShadow:
                "0.07em 0 black, 0 0.07em black, -0.07em 0 black, 0 -0.07em black",
            }}
          >
            {game.description}
          </p>
          {game.score && (
            <div
              className="mt-2 flex items-center gap-2 text-sm text-gray-300 group-hover:text-white"
              style={{
                textShadow:
                  "0.07em 0 black, 0 0.07em black, -0.07em 0 black, 0 -0.07em black",
              }}
            >
              <Rating
                value={(parseInt(game.score) * 5) / 100}
                color="yellow"
                size={20}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
