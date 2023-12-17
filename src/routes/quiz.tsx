import { useState } from "react";
import { useFindRandomGames } from "@/services/api/games";
import { PauseCircle, Play, ThumbsDown, ThumbsUp } from "lucide-react";
import { InfinitySpin } from "react-loader-spinner";

import { shuffleArray } from "@/lib/array";
import { generatePastelColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import GameCard from "@/components/gameCard";

export default function Quiz() {
  const [play, setPlay] = useState(false);

  const { data: games, isLoading: gamesLoading } = useFindRandomGames();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState<string[]>([]);

  const handleStart = () => {
    if (games) {
      const next = Math.floor(Math.random() * 100);
      setIndex(next);
      setDone([games[next].name]);

      setScore(0);
      setCount(0);
      setPlay(true);
    }
  };

  const handleNext = (choice: number) => {
    if (games) {
      if (choice === new Date(games[index].date).getFullYear()) {
        setScore(score + 1);
      }

      let next = Math.floor(Math.random() * 100);
      while (done.includes(games[next].name)) {
        next = Math.floor(Math.random() * 100);
      }

      setIndex(next);
      setDone([...done, games[next].name]);

      if (count === 10) {
        setPlay(false);
      } else {
        setCount(count + 1);
      }
    }
  };

  const handleStop = () => {
    setPlay(false);
  };

  const randomYears = (date: string) => {
    const years = [new Date(date).getFullYear()];

    while (years.length < 5) {
      const result = 1970 + Math.floor(Math.random() * (2023 - 1970));

      if (!years.includes(result)) {
        years.push(result);
      }
    }

    shuffleArray(years);

    return years;
  };

  return (
    <>
      <section className="container p-4 md:px-6 md:pt-8 lg:pt-16 xl:pt-24">
        <div className="flex flex-col items-center gap-4">
          <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
            Guess the date!
          </h1>

          <p className="mx-auto max-w-3xl text-sm text-zinc-200 sm:text-base md:text-xl">
            Devinez les dates de publications des jeux les plus connus !
          </p>

          {gamesLoading && (
            <div className="flex w-full justify-center">
              <div className="w-fit">
                <InfinitySpin width="200" color="#f9f9f9" />
              </div>
            </div>
          )}

          {games && !play && (
            <button
              className="flex items-center rounded-full border border-zinc-700 px-6 py-3 duration-300 hover:bg-white/10 hover:shadow-md hover:shadow-black"
              onClick={handleStart}
            >
              <Play className="mr-2 h-5 w-5" />
              Start the quiz
            </button>
          )}

          {games && play && (
            <button
              className="flex items-center rounded-full border border-zinc-700 px-6 py-3 duration-300 hover:bg-white/10 hover:shadow-md hover:shadow-black"
              onClick={handleStop}
            >
              <PauseCircle className="mr-2 h-5 w-5" />
              Stop the game
            </button>
          )}

          {count > 0 && (
            <div
              className={cn(
                "mx-auto flex max-w-3xl items-center gap-2 text-sm text-zinc-200 sm:text-base md:text-xl",
                {
                  "text-green-200": score >= count / 2,
                  "text-red-200": score < count / 2,
                }
              )}
            >
              {score >= count / 2 && <ThumbsUp />}
              {score < count / 2 && <ThumbsDown />}
              <p>
                Score: {score} / {count}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="container px-4 md:px-2">
        <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md p-4 sm:flex-row">
          {play && games && (
            <div className="flex w-1/2 flex-col">
              <GameCard
                game={{
                  ...games[index],
                  description: games[index].description.replace(/[0-9]*/g, ""),
                }}
              />
              <div className="mt-2 flex flex-col items-center justify-center gap-2 py-2">
                {randomYears(games[index].date).map((year) => (
                  <button
                    key={games[index].id + year}
                    onClick={() => handleNext(year)}
                    className="h-10 w-full rounded border-2 border-pink-200 text-lg font-semibold hover:brightness-50"
                    style={{
                      backgroundColor: `${generatePastelColor()}88`,
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
