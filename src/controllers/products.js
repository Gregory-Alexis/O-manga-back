const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');

module.exports = {
  getAllProducts: async (req, res) => {
    const result = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        universe: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ id: 'asc' }],
    });
    res.status(200).json(result);
  },
  getOneProduct: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { reviews: true, orders: true },
    });

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result);
  },
  createProduct: async (req, res) => {
    if (!req.body.image_url) {
      return res.status(400).json({ message: 'Image url is required' });
    }

    const image = await cloudinary.uploader.upload(req.body.image_url, {
      folder: 'products',
    })

    const result = await prisma.product.create({
      data: {
        ...req.body,
        image_url: image.secure_url,
      },
    });
    res.status(201).json({ message: 'Product succesfully created', result });
  },
  deleteOneProduct: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json();
  },
  updateOneProduct: async (req, res) => {
    if (req.body.image_url) {
      const image = await cloudinary.uploader.upload(req.body.image_url, {
        folder: 'products',
      })
      req.body.image_url = image.secure_url;
    }
    const id = req.params.id;
    const result = await prisma.product.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).json({ message: 'Product succesfully updated', result });
  },
};
