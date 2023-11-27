import { JSX } from "react";

type Props = JSX.IntrinsicElements["select"] & {
  label: string;
};

export default function Select({ label, className, ...restProps }: Props) {
  return (
    <label className="flex flex-col gap-1">
      <span>{label}</span>
      <select
        className={`appearance-none px-2 py-3 text-base text-black border border-grey rounded-md ${className}`}
        {...restProps}
      />
    </label>
  );
}
