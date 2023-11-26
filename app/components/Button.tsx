import { Link, type LinkProps } from "@remix-run/react";
import classnames from "classnames";
import { JSX } from "react";

type Props = JSX.IntrinsicElements["button"] &
  LinkProps & {
    primary?: boolean;
  };

export default function Button({ to, className, primary, ...rest }: Props) {
  const classes = classnames(
    "py-4 transition cursor-pointer",
    {
      "inline-block": to,
      "border border-grey": !primary,
      "border border-light-blue": primary,
      "bg-transparent text-grey": !primary,
      "bg-light-blue text-grey": primary,
      "px-2.5": !primary,
      "px-4": primary,
      "hover:bg-grey hover:text-black": !primary,
      "hover:bg-white hover:text-black": primary,
      "font-standard": !primary,
      "font-plakat": primary,
    },
    className,
  );

  if (to) {
    return <Link className={classes} {...(rest as LinkProps)} />;
  }

  return <button className={classes} {...rest} />;
}
