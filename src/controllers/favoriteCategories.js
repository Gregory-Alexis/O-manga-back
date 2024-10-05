const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllFavoriteCategories: async (req, res) => {
    const user_id = parseInt(req.params.userId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteCategories = await prisma.favoriteCategory.findMany({
      where: {
        user_id,
      },
      include: {
        category: true,
      },
    });

    res.status(200).json(favoriteCategories);
  },

  addOneFavoriteCategory: async (req, res) => {
    const user_id = parseInt(req.params.userId);
    const category_id = parseInt(req.params.categoryId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const category = await prisma.category.findUnique({
      where: { id: category_id },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const existingFavorite = await prisma.favoriteCategory.findFirst({
      where: {
        user_id,
        category_id,
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Category is already in the user's favorites" });
    }

    const favorite = await prisma.favoriteCategory.create({
      data: {
        user_id,
        category_id,
      },
    });

    res.status(201).json(favorite);
  },


  removeOneFavoriteCategory: async (req, res) => {
    const user_id = parseInt(req.params.userId);
    const category_id = parseInt(req.params.categoryId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const category = await prisma.category.findUnique({
      where: { id: category_id },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const favorite = await prisma.favoriteCategory.findFirst({
      where: {
        user_id,
        category_id,
      },
    });

    if (!favorite) {
      return res.status(404).json({ message: "Category is not in the user's favorites" });
    }

    await prisma.favoriteCategory.delete({
      where: {
        id: favorite.id,
      },
    });

    res.status(204).end();
  },
};

