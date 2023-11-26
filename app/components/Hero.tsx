import Button from "~/components/Button";
import Image from "~/components/Image";

export default function Hero() {
  return (
    <div className="full relative">
      <Image src="/bandfoto.jpg" alt="De Borgers Familieband" />

      <div className="absolute bg-black/50 top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <div className="w-2/3 space-y-6 text-center">
          <h1 className="text-4xl md:text-6xl font-plakat">
            Feestelijk 2024 openen?
          </h1>
          <p className="text-xl md:text-2xl font-plakat">
            Op 6 en 7 januari keren we terug naar een traditie in Eindhoven: wij
            openen dan het nieuwe jaar met een show in het Blue Collar Theater.
          </p>
          <p className="text-xl md:text-2xl font-plakat">
            Wil jij erbij zijn? Boek dan nu je kaarten!
          </p>

          <Button to="/events" primary>
            Boek tickets
          </Button>
        </div>
      </div>
    </div>
  );
}
