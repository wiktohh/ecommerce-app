import { PrismaClient } from "@prisma/client";
import { products } from "./products";
import { discounts } from "./discounts";

const prisma = new PrismaClient();

async function main() {
  if ((await prisma.product.count()) === 0) {
    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
    }
  }

  if ((await prisma.discount.count()) === 0) {
    for (const discount of discounts) {
      await prisma.discount.create({
        data: discount,
      });
    }
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
