import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {

  return (
    <h1>Borgers</h1>
  );
}
