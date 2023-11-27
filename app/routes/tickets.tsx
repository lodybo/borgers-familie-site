import { Outlet } from "@remix-run/react";

import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function TicketLayout() {
  return (
    <div className="w-full h-full grid grid-rows-[5rem_1fr_5rem] space-y-6">
      <Header />

      <div className="content">
        <Outlet />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
