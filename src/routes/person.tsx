import { useFindPerson } from "@/services/api/person";
import { useParams } from "react-router-dom";

export default function Person() {
  const { id } = useParams();

  const { data } = useFindPerson(id);
  const person = data?.results.bindings[0];
  const dateBirth = person?.dateBirth.value
    ? new Date(person?.dateBirth.value)
    : undefined;
  let dateDeath;
  if (person?.dateDeath) {
    dateDeath = new Date(person?.dateDeath.value);
  }

  return (
    <main className="layout min-h-screen w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
      <section className="container px-4 py-12 md:px-6 md:pt-8 lg:pt-16 xl:pt-24">
        <div className="grid items-center gap-4">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text pb-4 text-3xl font-bold italic tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
              {person?.name.value}
            </h1>
            {person?.nativeName.value != person?.name.value && (
              <p className="mx-2 text-2xl text-gray-300 group-hover:text-white">
                {person?.nativeName.value}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-2 md:pt-4 lg:pt-8 xl:pt-12">
        <div className="flex h-full w-full overflow-hidden rounded-md p-4">
          {person?.image && (
            <div className="m-1 mb-3.5 h-1/2 w-1/2">
              <img className="h-full w-full" src={person?.image.value ?? ""} />
            </div>
          )}
          {!person?.image && (
            <div className="m-1 mb-3.5 h-1/2 w-1/2">
              <img
                className="h-full w-full"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicturesofmaidenhead.files.wordpress.com%2F2019%2F01%2Fimage-not-found.jpg&f=1&nofb=1&ipt=c7f29bbe09abe700f04cd1938142fdf590986b85187de4571b91d75adfde5afd&ipo=images"
              />
            </div>
          )}

          <div className="m-1 mb-3.5 h-1/2 w-1/2 flex-col">
            {person?.dateBirth && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Date de naissance : </b>
                {dateBirth?.toLocaleDateString()}
              </p>
            )}
            {person?.dateDeath && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Date de mort : </b>
                {dateDeath?.toLocaleDateString()}
              </p>
            )}

            {person?.signature && (
              <div className="m-1 mb-3.5 h-1/2 w-1/2">
                <img
                  className="h-full w-full brightness-0 invert"
                  src={person?.signature.value}
                />
              </div>
            )}
            {/*
            game?.genres.value.length != 0 && (
              <p className="mx-2 text-xl text-gray-300 group-hover:text-white">
                <b>Genre : </b>{" "}
                {game?.genres.value.slice(0, -1).map((genre) => (
                  <span>{genre}, </span>
                ))}
                <span>{game?.genres.value.slice(-1)}</span>
              </p>
                )*/}
          </div>
        </div>
      </section>
    </main>
  );
}
