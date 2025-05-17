"use server";

import { prisma } from "@/lib/prisma";

export async function getAllDepartments() {
  try {
    const categories = await prisma.department.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw new Error("Failed to fetch departments");
  }
}
