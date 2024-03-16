import prisma from "../lib/prisma";
export const getPopularProducts = async () => {
  try {
    // TODO: Add algorithm to get popular products
    const populatProducts = await prisma.product.findMany({
      take: 8,
    });
    return populatProducts;
  } catch (e) {
    return [];
  }
};
