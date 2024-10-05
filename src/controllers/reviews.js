const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllReviewsByProduct: async (req, res) => {
    const product_id = parseInt(req.params.productId);

    const reviews = await prisma.review.findMany({
      where: { product_id },
      orderBy: [{ id: 'asc' }],
    });

    res.status(200).json(reviews);

  },

  getOneReview: async (req, res) => {
    const review_id = parseInt(req.params.reviewId);

    const review = await prisma.review.findUnique({
      where: { id: review_id },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);

  },

  addReview: async (req, res) => {
    const user_id = parseInt(req.params.userId);
    const product_id = parseInt(req.params.productId);
    const { rating, content } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await prisma.product.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = await prisma.review.create({
      data: {
        user_id,
        product_id,
        rating,
        content,
      },
    });

    res.status(201).json(review);

  },

  deleteOneReview: async (req, res) => {
    const user_id = parseInt(req.params.userId);
    const review_id = parseInt(req.params.reviewId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const review = await prisma.review.findUnique({
      where: { id: review_id },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user_id !== user_id && user.role === 'USER') {
      return res.status(403).json({ message: "You are not authorised to delete this review" });
    }

    await prisma.review.delete({
      where: {
        id: review_id,
      },
    });

    res.status(204).end();

  },

  updateOneReview: async (req, res) => {
    const user_id = parseInt(req.params.userId);
    const review_id = parseInt(req.params.reviewId);
    const { rating, content, published } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const review = await prisma.review.findUnique({
      where: { id: review_id },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user_id !== user_id) {
      return res.status(403).json({ message: "You are not authorised to update this review" });
    }

    const updatedReview = await prisma.review.update({
      where: {
        id: review_id,
      },
      data: {
        rating,
        content,
        published,
      },
    });

    res.status(200).json({ message: 'Review succesfully updated', updatedReview });
  },
};
