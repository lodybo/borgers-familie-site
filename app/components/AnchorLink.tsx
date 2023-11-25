import { Link, LinkProps } from "@remix-run/react";

type Props = LinkProps;

export default function AnchorLink({ children, ...props }: Props) {
  return (
    <Link
      {...props}
      className="text-light-blue border-b border-b-grey font-bold pb-0 hover:pb-0.5 hover:border-b-light-blue transition-all duration-200 ease-in-out"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
