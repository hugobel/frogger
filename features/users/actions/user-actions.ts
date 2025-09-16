"use server";

import prisma from "@/lib/prisma";

export async function getRandomUser() {
  try {
    // Get a random user from the database
    const userCount = await prisma.user.count();

    if (userCount === 0) {
      return null;
    }

    const randomSkip = Math.floor(Math.random() * userCount);

    const user = await prisma.user.findFirst({
      skip: randomSkip,
    });

    return user;
  } catch (error) {
    console.error("Error fetching random user:", error);
    return null;
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
