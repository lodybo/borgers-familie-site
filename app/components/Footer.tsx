import Image from "~/components/Image";

type Props = {
  showImage?: boolean;
};

export default function Footer({ showImage }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {showImage ? (
        <Image
          className="full"
          src="/borgers-familie-blue-collar.jpg"
          alt="De Borgers familie in het Blue Collar Theater, januari 2017"
        />
      ) : null}

      <div className="bg-light-blue text-white flex justify-center py-5 px-10 text-base">
        (c) 2017 - {currentYear} Borgers Familieband
      </div>
    </>
  );
}
