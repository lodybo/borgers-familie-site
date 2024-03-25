import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Image from "~/components/Image";

type Props = {
  scrollAnchorID?: string;
};

export default function Hero({ scrollAnchorID }: Props) {
  const handleScrollTrigger = () => {
    const scrollAnchor = document.querySelector(`#${scrollAnchorID}`);
    if (scrollAnchor) {
      scrollAnchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="full relative max-h-screen h-full">
      <Image
        className="h-full w-full object-cover object-center"
        alt="De Borgers Familieband"
        src="/image/bandfoto.jpg"
        srcSet="
          /image/bandfoto.jpg?w=800 800w,
          /image/bandfoto.jpg?w=1200 1200w,
          /image/bandfoto.jpg?w=1600 1600w,
          /image/bandfoto.jpg?w=2000 2000w
        "
        sizes="100vw"
      />

      <div className="absolute bg-black/50 top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <div className="w-2/3 space-y-6 text-center">
          <h1 className="text-3xl md:text-6xl font-plakat">
            Borgers: Family Life
          </h1>
          <p className="text-lg md:text-2xl font-plakat">
            Muziek uit de kempen. Samen met zijn zussen, dochter, broer en een
            paar neven brengt Bertus Borgers een bont repertoire vintage Rock,
            Soul en Blues naar het podium.
          </p>

          {scrollAnchorID ? (
            <div className="w-full flex justify-center">
              <Button onClick={handleScrollTrigger} rounded>
                <Icon name="arrow-down" sizes="xl" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
