import { useRef, type RefObject } from "react";
import { MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
  wrapper: RefObject<HTMLDivElement>;
};

export function GameCard({ game, wrapper }: GameCardProps) {
  const ref = useRef<HTMLAnchorElement[]>([]);

  wrapper.current!.onmousemove = (e) => {
    for (const card of ref.current) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <Link
      ref={(el) => (ref.current![0] = el!)}
      to={`game/${game.url.split("/").slice(-1)}`}
      className="card group relative h-48 w-full rounded-xl bg-zinc-700 shadow-md shadow-black outline-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-500 hover:shadow-xl hover:shadow-black hover:before:opacity-100"
    >
      <div className="absolute inset-[1px] z-[2] flex flex-col gap-2.5 rounded-xl bg-[#141414] p-2.5">
        <div className="relative h-full w-full overflow-hidden rounded-md p-4">
          {game.logo && (
            <div className="mb-3.5 h-14 w-14">
              <img src={game.logo} />
            </div>
          )}

          <h3 className="text-xl">
            <div className="flex h-full w-full items-center after:absolute after:inset-0">
              {game.name}

              <MoveUpRight
                strokeWidth={0.75}
                className="ml-1 h-4 w-4 text-white"
              />
            </div>
          </h3>

          <p className="mt-2 text-sm text-gray-300 group-hover:text-white">
            {game.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
