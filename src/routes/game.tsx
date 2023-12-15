import { useFindGame } from "@/services/api/games";
import { useFindMultipleProperty } from "@/services/api/object";
import { useParams } from "react-router-dom";

export default function Game() {
  const { id } = useParams();

  const { data: game } = useFindGame(id);
  const { data: genders } = useFindMultipleProperty(id, "P136");

  return (
    <main className="layout min-h-screen w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
      <section className="container px-4 py-12 md:px-6 md:pt-8 lg:pt-16 xl:pt-24">
        <div className="grid items-center gap-4">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text pb-4 text-3xl font-bold italic tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
              {game?.name}
            </h1>

            {game?.description && (
              <p className="mx-2 text-2xl text-gray-300 group-hover:text-white">
                {game.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-2 md:pt-4 lg:pt-8 xl:pt-12">
        <div className="flex h-full w-full overflow-hidden rounded-md p-4">
          {game?.logo && (
            <div className="m-1 mb-3.5 h-1/2 w-1/2">
              <img className="h-full w-full" src={game?.logo} />
            </div>
          )}
          {!game?.logo && (
            <div className="m-1 mb-3.5 h-1/2 w-1/2">
              <img
                className="h-full w-full"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicturesofmaidenhead.files.wordpress.com%2F2019%2F01%2Fimage-not-found.jpg&f=1&nofb=1&ipt=c7f29bbe09abe700f04cd1938142fdf590986b85187de4571b91d75adfde5afd&ipo=images"
              />
            </div>
          )}

          <div className="m-1 mb-3.5 h-1/2 w-1/2 flex-col">
            {game?.website && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Site web : </b>{" "}
                <a href={game.website} target="blank">
                  {game?.website}
                </a>
              </p>
            )}
            {game?.date && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Date de sortie : </b>
                {new Date(game?.date).toLocaleDateString()}
              </p>
            )}
            {genders?.map((gender) => <p>{gender.name}</p>)}
          </div>
        </div>
      </section>
    </main>
  );
}
