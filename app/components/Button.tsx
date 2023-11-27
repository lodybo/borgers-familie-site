import { Link, type LinkProps } from "@remix-run/react";
import classnames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface BaseProps {
  primary?: boolean;
}
interface ButtonProps
  extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    BaseProps {
  to?: never;
}

interface ButtonLinkProps extends LinkProps, BaseProps {}

type Props = ButtonProps | ButtonLinkProps;

export default function Button({ className, primary, ...restProps }: Props) {
  const classes = classnames(
    "py-4 transition cursor-pointer",
    {
      "inline-block": restProps.to,
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

  if ("to" in restProps) {
    const { to = "", ...rest } = restProps as ButtonLinkProps;
    return <Link to={to} className={classes} {...rest} />;
  }

  return <button className={classes} {...(restProps as ButtonProps)} />;
}
