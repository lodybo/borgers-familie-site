import Image from "~/components/Image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Image
        className="full"
        src="/borgers-familie-blue-collar.jpg"
        alt="De Borgers familie in het Blue Collar Theater, januari 2017"
      />

      <div className="bg-light-blue flex justify-center py-5 px-10 text-base">
        (c) 2017 - {currentYear} Borgers Familieband
      </div>
    </>
  );
}
