import { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Game } from "@/types/game";

export default function Game() {
  const params = useParams();
  
  const game: Game = {
    name: "Minecraft",
    url: "https://www.minecraft.net/fr-fr",
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.F0mIB5kWOldDWtdyWipr2AHaD3%26pid%3DApi&f=1&ipt=68cfe4fac7b5ba392822e4465ba3654c98a1113f757d2c727b7f7da91df6e512&ipo=images",
    description: "Un jeu d'aventure cubique"
  }

  useEffect(() => {

  });

  return (
    <main className="min-h-screen layout w-full bg-black bg-fixed text-white selection:bg-white selection:text-black">
      <section className="container px-4 py-12 md:px-6 md:pt-24 lg:pt-32 xl:pt-48">
        
        
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <h1 className="pb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl">
              Jeu : {game.name}
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
}
