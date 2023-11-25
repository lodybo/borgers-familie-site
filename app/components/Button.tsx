import { JSX } from "react";

type Props = JSX.IntrinsicElements["button"];

export default function Button(props: Props) {
  return (
    <button
      className="border border-grey px-2.5 py-4 transition cursor-pointer"
      {...props}
    />
  );
}
