import { type LoaderFunctionArgs } from "@remix-run/node";
import { txt } from "remix-utils/responses";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  if (url.hostname === "staging.borgersfamilie.nl") {
    return txt(`
    User-agent: *
    Disallow: /
  `);
  }

  return txt(`
    User-agent: *
    Allow: /
    Disallow: /tickets/*
    Disallow: /betaling/*
  `);
}
