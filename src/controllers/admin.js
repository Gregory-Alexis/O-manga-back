const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');

module.exports = {
  getDashboardInfos: async (req, res) => {
    const categories = await prisma.category.findMany({
      orderBy: [{ id: 'asc' }],
    });
    const reviews = await prisma.review.findMany({
      orderBy: [{ id: 'asc' }],
    });
    const orders = await prisma.order.findMany({
      orderBy: [{ id: 'asc' }],
    });
    const products = await prisma.product.findMany({
      orderBy: [{ id: 'asc' }],
    });
    const users = await prisma.user.findMany({
      orderBy: [{ id: 'asc' }],
    });
    const universes = await prisma.universe.findMany({
      orderBy: [{ id: 'asc' }],
    });

    res.status(200).json({ categories, reviews, orders, products, users, universes });
  },
}
