import { useFindGame } from "@/services/api/games";
import { useParams } from "react-router-dom";

export default function Game() {
  const { id } = useParams();

  const { data } = useFindGame(id);
  const game = data?.results.bindings[0];

  return (
    <main className="layout min-h-screen w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
      <section className="container px-4 py-12 md:px-6 md:pt-8 lg:pt-16 xl:pt-24">
        <div className="grid items-center gap-4">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text pb-4 text-3xl font-bold italic tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
              {game?.name.value}
            </h1>
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-2 md:pt-4 lg:pt-8 xl:pt-12">
        <div className="flex h-full w-full overflow-hidden rounded-md p-4">
          {game?.logo && (
            <div className="m-1 mb-3.5 h-1/2 w-1/2">
              <img className="h-full w-full" src={game?.logo.value ?? ""} />
            </div>
          )}
          {!game?.logo && (
            <div className="m-1 mb-3.5 h-1/2 w-1/2">
              <img
                className="h-full w-full"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedias.pourlascience.fr%2Fapi%2Fv1%2Fimages%2Fview%2F5a82a9828fe56f22555a9551%2Fwide_1300%2Fimage.jpg&f=1&nofb=1&ipt=2a5d40a1c72699aefe23a568ab386871cbf08d7bf8ba8bf7f2f0e70d0ffd8276&ipo=images"
              />
            </div>
          )}

          <div className="m-1 mb-3.5 h-1/2 w-1/2 flex-col">
            {game?.website.value && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Site web : </b>{" "}
                <a href={game.website.value ?? ""} target="blank">
                  {game?.website.value}
                </a>
              </p>
            )}
            {game?.date && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Date de sortie : </b> {game.date.value}
              </p>
            )}
            {game?.description && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Description : </b> {game.description.value}
              </p>
            )}
            {/*
            // On n'a pas encore les genres
            
            game?.genres.value.length != 0 && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Genre : </b>{" "}
                {game.genres.slice(0, -1).map((genre) => (
                  <span>{genre}, </span>
                ))}
                <span>{game.genres.slice(-1)}</span>
              </p>
                )
            */}
          </div>
        </div>
      </section>
    </main>
  );
}
