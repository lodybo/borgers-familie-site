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
  return prisma.event.findUniqueOrThrow({
    where: {
      slug,
    },
  });
}

export function getEventById(id: string) {
  return prisma.event.findUniqueOrThrow({
    where: {
      id,
    },
  });
}
