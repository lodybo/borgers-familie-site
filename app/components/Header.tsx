import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <div className="bg-light-blue text-white flex justify-start items-center py-5 md:px-10 px-5">
      <h1 className="font-plakat">
        <Link to="/">Borgers</Link>
      </h1>
    </div>
  );
}
