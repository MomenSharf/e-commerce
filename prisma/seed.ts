import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

async function seedCategories() {
  const filePath = path.join(__dirname, "data", "categories.csv");
  const file = fs.readFileSync(filePath);
  const records = parse(file, { columns: true, skip_empty_lines: true });

  for (const row of records) {
    await prisma.category.create({
      data: {
        id: Number(row.id),
        category_name: row.category_name, // Use the correct field name here
      },
    });
  }
}

async function seedProducts() {
  const filePath = path.join(__dirname, "data", "products.csv");
  const file = fs.readFileSync(filePath);
  const records = parse(file, { columns: true, skip_empty_lines: true });
  let index = 0;
  for (const row of records) {
    await prisma.product.create({
      data: {
        asin: row.asin,
        title: row.title,
        imgUrl: row.imgUrl,
        productURL: row.productURL,
        stars: parseFloat(row.stars),
        reviewCount: parseInt(row.reviewCount),
        price: parseFloat(row.price),
        listPrice: parseFloat(row.listPrice),
        isBestSeller: row.isBestSeller === "True",
        boughtInLastMonth: parseInt(row.boughtInLastMonth),
        category: {
          connect: { id: Number(row.categoryId) },
        },
      },
    });
    console.log(index++);
  }
}

async function main() {
  await seedCategories();
  await seedProducts();
}

main()
  .then(() => {
    console.log("Seeding complete");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
