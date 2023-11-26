import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "hi@lodybo.nl";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("lodyiscool", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.event.create({
    data: {
      name: "Borgers Family Life, gepresenteerd door Bertus Borgers",
      slug: "borgers-family-life",
      date: new Date(2024, 0, 6, 20, 30, 0),
      doorsOpen: new Date(2024, 0, 6, 19, 30, 0),
      description:
        "Rockveteraan Bertus Borgers presenteert Borgers Family Life. Op zaterdag 6 januari 2024\n" +
        "brengt hij met zijn zussen, dochter, broer en een paar neven een bont repertoire vintage\n" +
        "Rock, Soul en Blues. Met een historische show op het podium van Blue Collar Hotel blaast\n" +
        "deze Veldhovense familie het nieuwe jaar leven in!",
      venue: "Blue Collar Theater",
      venueAddress: "Blue Collar Hotel, Klokgebouw, Eindhoven",
      venueUrl: "https://www.bluecollarhotel.nl/",
      imagePath: "/torn_paper.png",
      price: 17.5,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
