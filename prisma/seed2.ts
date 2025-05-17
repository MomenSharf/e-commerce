import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
  const csvFilePath = path.join(__dirname, './data/amazon-products.csv');

  const products: any[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        products.push(row);
      })
      .on('end', resolve)
      .on('error', reject);
  });

  for (const row of products) {
    try {
      const {
        title,
        seller_name,
        brand,
        department,
        description,
        initial_price,
        final_price,
        currency,
        availability,
        reviews_count,
        categories,
        asin,
        buybox_seller,
        number_of_sellers,
        root_bs_rank,
        answered_questions,
        domain,
        images_count,
        url,
        video_count,
        image_url,
        item_weight,
        rating,
        product_dimensions,
        seller_id,
        date_first_available,
        discount,
        model_number,
        manufacturer,
        plus_content,
        upc,
        video,
        top_review,
        variations,
        delivery,
        format,
        buybox_prices,
        parent_asin,
        input_asin,
        ingredients,
        origin_url,
        bought_past_month,
        is_available,
        root_bs_category,
        bs_category,
        bs_rank,
        badge,
        subcategory_rank,
        amazon_choice,
        images,
        product_details,
        prices_breakdown,
        country_of_origin,
        timestamp,
      } = row;

      // Get or create brand
      const brandRecord = brand
        ? await prisma.brand.findUnique({ where: { name: brand.trim() } })
        : null;

      // Get or create department
      const departmentRecord = department
        ? await prisma.department.findUnique({ where: { name: department.trim() } })
        : null;

      // Parse categories and find or create
      const categoryRecords = (await Promise.all(
        ((): string[] => {
          if (!categories) return [];
          try {
            return JSON.parse(categories);
          } catch {
            return categories.split(',').map((cat: string) => cat.trim());
          }
        })().map(async (name) => {
          return await prisma.category.findUnique({ where: { name } });
        })
      )).filter(
        (cat): cat is { id: string; name: string; parentId: string | null } =>
          cat !== null
      );

      // Create product
      await prisma.product.create({
        data: {
          title,
          sellerName: seller_name,
          brand: brandRecord ? { connect: { id: brandRecord.id } } : undefined,
          department: departmentRecord
            ? { connect: { id: departmentRecord.id } }
            : undefined,
          description: description || null,
          initialPrice: parseFloat(initial_price || '') || null,
          finalPrice: parseFloat(final_price || '') || null,
          currency,
          availability: availability?.toLowerCase() === 'true',
          reviewsCount: parseInt(reviews_count || '') || 0,
          asin,
          buyboxSeller: buybox_seller || null,
          numberOfSellers: parseInt(number_of_sellers || '') || null,
          rootBsRank: parseInt(root_bs_rank || '') || null,
          answeredQuestions: parseInt(answered_questions || '') || null,
          domain,
          imagesCount: parseInt(images_count || '') || null,
          url,
          videoCount: parseInt(video_count || '') || null,
          imageUrl: image_url || null,
          itemWeight: item_weight || null,
          rating: parseFloat(rating || '') || null,
          productDimensions: product_dimensions || null,
          sellerId: seller_id || null,
          dateFirstAvailable: date_first_available ? new Date(date_first_available) : null,
          discount,
          modelNumber: model_number || null,
          manufacturer,
          plusContent: plus_content || null,
          upc,
          video,
          topReview: top_review || null,
          variations: variations ? JSON.parse(variations) : undefined,
          delivery,
          format,
          buyboxPrices: buybox_prices || null,
          parentAsin: parent_asin || null,
          inputAsin: input_asin || null,
          ingredients,
          originUrl: origin_url || null,
          boughtPastMonth: bought_past_month?.toLowerCase() === 'true',
          isAvailable: is_available?.toLowerCase() === 'true',
          rootBsCategory: root_bs_category || null,
          bsCategory: bs_category || null,
          bsRank: parseInt(bs_rank || '') || null,
          badge,
          subcategoryRank: parseInt(subcategory_rank || '') || null,
          amazonChoice: amazon_choice?.toLowerCase() === 'true',
          images,
          productDetails: product_details || null,
          pricesBreakdown: prices_breakdown || null,
          countryOfOrigin: country_of_origin || null,
          // Timestamp must be non-null, so fallback to current date if missing
          timestamp: timestamp ? new Date(timestamp) : new Date(),

          categories: {
            connect: categoryRecords.map((cat) => ({ id: cat.id })),
          },
        },
      });

      console.log(`✅ Added product: ${title}`);
    } catch (error) {
      console.error(`❌ Error adding product with ASIN: ${row.asin}`, error);
    }
  }

  await prisma.$disconnect();
  console.log('🎉 Product seeding complete.');
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
