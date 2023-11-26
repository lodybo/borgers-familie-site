import Bertus from "~/assets/bandmembers/bertus.jpg";
import Christine from "~/assets/bandmembers/christine.jpg";
import Lody from "~/assets/bandmembers/lody.jpg";
import MarieJose from "~/assets/bandmembers/marie-jose.jpg";
import Maurice from "~/assets/bandmembers/maurice.jpg";
import Nova from "~/assets/bandmembers/nova.jpg";
import Renie from "~/assets/bandmembers/renie.jpg";
import Ruud from "~/assets/bandmembers/ruud.jpg";
import Wouter from "~/assets/bandmembers/wouter.jpg";

// TODO: Flen toevoegen
const roster = [
  {
    name: "Bertus Borgers",
    role: "zang, sax",
    image: Bertus,
  },
  {
    name: "Ruud Borgers",
    role: "gitaar, zang",
    image: Ruud,
  },
  {
    name: "Lody Borgers",
    role: "gitaar, zang",
    image: Lody,
  },
  {
    name: "Maurice Christian George",
    role: "basgitaar",
    image: Maurice,
  },
  {
    name: "Wouter Mollen",
    role: "drums",
    image: Wouter,
  },
  {
    name: "Nova Borgers",
    role: "zang",
    image: Nova,
  },
  {
    name: "Christine Borgers",
    role: "zang",
    image: Christine,
  },
  {
    name: "Renie Borgers",
    role: "zang",
    image: Renie,
  },
  {
    name: "Marie José Borgers",
    role: "zang",
    image: MarieJose,
  },
];

export default function RosterContent() {
  return (
    <div className="full py-14 text-2xl bg-grey text-black space-y-10">
      <h2 className="text-center font-plakat text-4xl">
        Bertus wordt op podium bijgestaan door leden van de familie:
      </h2>

      <ul className="px-8 grid grid-cols-[repeat(auto-fit,_minmax(8rem,_1fr))] grid-rows-[minmax(8rem,_1fr)] auto-rows-[1fr] gap-4">
        {roster.map((member, index) => (
          <li key={index} className="grid grid-rows-2 justify-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <div className="text-center">
              <p className="font-plakat text-lg">{member.name}</p>
              <p className="text-base">{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
