import { PrismaClient } from "@prisma/client";
import { products } from "./products";
import { discounts } from "./discounts";

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  for (const discount of discounts) {
    await prisma.discount.create({
      data: discount,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
