const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllFavoriteUniverses: async (req, res) => {
    const user_id = parseInt(req.params.userId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Recover the user's favourite universes using a join with the favoriteUniverse table
    const favoriteUniverses = await prisma.favoriteUniverse.findMany({
      where: {
        user_id,
      },
      include: {
        universe: true,
      },
    });

    res.status(200).json(favoriteUniverses);
  },

  addOneFavoriteUniverse: async (req, res) => {
    const user_id = parseInt(req.params.userId);
    const universe_id = parseInt(req.params.universeId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const universe = await prisma.universe.findUnique({
      where: { id: universe_id },
    });

    if (!universe) {
      return res.status(404).json({ message: "Universe not found" });
    }

    // Check whether the user has already added this universe to their favourites
    const existingFavorite = await prisma.favoriteUniverse.findFirst({
      where: {
        user_id,
        universe_id,
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Universe is already in the user's favorites" });
    }

    const favorite = await prisma.favoriteUniverse.create({
      data: {
        user_id,
        universe_id,
      },
    });

    res.status(201).json(favorite);
  },


  removeOneFavoriteUniverse: async (req, res) => {
    const user_id = parseInt(req.params.userId);
    const universe_id = parseInt(req.params.universeId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const universe = await prisma.universe.findUnique({
      where: { id: universe_id },
    });

    if (!universe) {
      return res.status(404).json({ message: "User not found" });
    }

    const favorite = await prisma.favoriteUniverse.findFirst({
      where: {
        user_id,
        universe_id,
      },
    });

    if (!favorite) {
      return res.status(404).json({ message: "Universe is not in the user's favorites" });
    }

    await prisma.favoriteUniverse.delete({
      where: {
        id: favorite.id,
      },
    });

    res.status(204).end();
  },
};
