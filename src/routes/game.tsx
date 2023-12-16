import { useFindCreators, useFindGame } from "@/services/api/games";
import { useFindMultipleProperty } from "@/services/api/object";
import { useParams } from "react-router-dom";

export default function Game() {
  const { id } = useParams();

  const { data: game } = useFindGame(id);
  let { data: publishers } = useFindCreators(id, "P123");
  let { data: developers } = useFindCreators(id, "P178");
  const { data: genders } = useFindMultipleProperty(id, "P136");
  const { data: scores } = useFindMultipleProperty(id, "P737");

  publishers = publishers?.filter((publisher, index) => {
    return (
      publishers?.find(
        (element, index2) => element.name == publisher.name && index2 < index
      ) == undefined
    );
  });

  developers = developers?.filter((developer, index) => {
    return (
      developers?.find(
        (element, index2) => element.name == developer.name && index2 < index
      ) == undefined
    );
  });

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

          <div className="m-1 mb-3.5 h-1/2 w-1/2 flex-col p-2">
            {game?.website && (
              <div className="flex gap-2 text-xl text-gray-300 group-hover:text-white">
                <p className="font-bold">website :</p>
                <a href={game.website} target="blank">
                  {game?.website}
                </a>
              </div>
            )}
            <br />
            {game?.date && (
              <div className="flex gap-2 text-xl text-gray-300 group-hover:text-white">
                <p className="font-bold">published date :</p>
                {new Date(game?.date).toLocaleDateString()}
              </div>
            )}
            <br />
            {genders && genders.length > 0 && (
              <div>
                <p className="text-xl font-bold text-gray-300 group-hover:text-white">
                  Genres :
                </p>
                <ul>
                  {scores?.map((gender) => (
                    <li className="text-lg" key={gender.item}>
                      <a href={gender.item}>{gender.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {genders?.map((gender) => <p>{gender.name}</p>)}
            <br />
            <p className="text-xl font-bold text-gray-300 group-hover:text-white">
              Publishers :
            </p>
            {publishers?.map((pub) => (
              <a
                className="block"
                href={`/${
                  pub.type.split("/").slice(-1)[0] == "Q5"
                    ? "person"
                    : "company"
                }/${pub.id.split("/").slice(-1)}`}
              >
                {pub.name}
              </a>
            ))}
            <br />
            <p className="text-xl font-bold text-gray-300 group-hover:text-white">
              Developers :
            </p>
            {developers?.map((dev) => (
              <a
                className="block"
                href={`/${
                  dev.type.split("/").slice(-1)[0] == "Q5"
                    ? "person"
                    : "company"
                }/${dev.id.split("/").slice(-1)}`}
              >
                {dev.name}
              </a>
            ))}
            <br />
            {game?.score && (
              <div className="flex gap-2 text-xl text-gray-300 group-hover:text-white">
                <p className="font-bold">score :</p>
                <a
                  className="text-blue-600 underline"
                  href={"https://opencritic.com/game/" + game?.critId + "/-"}
                  target="_blank"
                >
                  {game?.score}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
