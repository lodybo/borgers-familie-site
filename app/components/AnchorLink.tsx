import { Link, LinkProps } from "@remix-run/react";
import classnames from "classnames";

type Props = LinkProps & {
  subtle?: boolean;
};

export default function AnchorLink({ children, subtle, ...props }: Props) {
  return (
    <Link
      {...props}
      className={classnames(
        "border-b border-b-grey font-bold pb-0 hover:pb-0.5 hover:border-b-light-blue transition-all duration-200 ease-in-out",
        {
          "text-light-blue": !subtle,
          "text-grey": subtle,
        },
      )}
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
