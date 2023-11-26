import { prisma } from "~/db.server";

export { type Event } from "@prisma/client";

export function getEvents() {
  return prisma.event.findMany({
    orderBy: {
      date: "asc",
    },
  });
}

export function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: {
      slug,
    },
  });
}
