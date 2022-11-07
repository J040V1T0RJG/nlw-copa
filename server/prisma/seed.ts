import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "seedUser",
      email: "seedUser@gmail.com",
      googleId: "19edb2974gd9wdy8324rfdv",
      avatarUrl: "https://github.com/J040V1T0RJG.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "seed pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-05T12:00:00.533Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-06T12:00:00.533Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "BR",

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });

  prisma.$disconnect();
}

main();
