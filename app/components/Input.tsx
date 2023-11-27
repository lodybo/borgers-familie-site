import { JSX } from "react";

type Props = JSX.IntrinsicElements["input"] & {
  label: string;
};

export default function Input({ label, className, ...restProps }: Props) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-base">{label}</span>
      <input
        className={`px-2 py-3 text-base text-black border border-grey rounded-md ${className}`}
        {...restProps}
      />
    </label>
  );
}
