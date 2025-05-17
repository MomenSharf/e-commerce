import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
  const categoriesSet = new Set<string>();
  const brandsSet = new Set<string>();
  const departmentsSet = new Set<string>();

  const csvFilePath = path.join(__dirname, './data/amazon-products.csv');

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        // Clean categories
        const categories = row.categories;
        if (categories) {
          try {
            const parsed = JSON.parse(categories);
            if (Array.isArray(parsed)) {
              parsed.forEach((cat: string) => categoriesSet.add(cat.trim()));
            }
          } catch {
            categories.split(',').forEach((cat: string) => {
              categoriesSet.add(cat.trim());
            });
          }
        }

        // Brand
        const brand = row.brand?.trim();
        if (brand) brandsSet.add(brand);

        // Department
        const department = row.department?.trim();
        if (department) departmentsSet.add(department);
      })
      .on('end', async () => {
        console.log('CSV processed. Seeding...');

        // Create brands
        for (const brand of brandsSet) {
          await prisma.brand.upsert({
            where: { name: brand },
            update: {},
            create: { name: brand },
          });
        }

        // Create departments
        for (const department of departmentsSet) {
          await prisma.department.upsert({
            where: { name: department },
            update: {},
            create: { name: department },
          });
        }

        // Create categories
        for (const category of categoriesSet) {
          await prisma.category.upsert({
            where: { name: category },
            update: {},
            create: { name: category },
          });
        }

        console.log('Seeding complete!');
        resolve();
      })
      .on('error', reject);
  });

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
