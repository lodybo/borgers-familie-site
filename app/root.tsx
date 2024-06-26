import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";

import { csrf } from "~/csrf.server";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

type BGHandle = { bg: string };

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [token, cookieHeader] = await csrf.commitToken(request);
  return json(
    { user: await getUser(request), token },
    { headers: { "Set-Cookie": cookieHeader! } },
  );
};

export default function App() {
  const { token } = useLoaderData<typeof loader>();
  const matches = useMatches();

  let appBG = "bg-black text-grey";
  const hasCustomBG = matches.find(
    (match) =>
      typeof match.handle === "object" && "bg" in (match.handle as BGHandle),
  );
  if (hasCustomBG) {
    appBG = (hasCustomBG.handle as BGHandle).bg;
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`h-full ${appBG} font-standard text-2xl mx-auto w-full`}>
        <AuthenticityTokenProvider token={token}>
          <Outlet />
        </AuthenticityTokenProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
