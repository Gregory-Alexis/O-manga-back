const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');

module.exports = {
  getAllCategories: async (req, res) => {
    const result = await prisma.category.findMany({
      orderBy: [{ id: 'asc' }],
    })
    res.json(result)
  },

  getOneCategory: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { products: true },
    });

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(result);
  },

  createCategory: async (req, res) => {
    if (!req.body.image_url) {
      return res.status(400).json({ message: 'Image url is required' });
    }

    // avoid the creation of the category if the name already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: req.body.name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }


    const image = await cloudinary.uploader.upload(req.body.image_url, {
      folder: 'categories',
    })

    const result = await prisma.category.create({
      data: {
        ...req.body,
        image_url: image.secure_url,
      },
    });
    res.status(201).json({ message: 'Category succesfully created', result });
  },

  deleteOneCategory: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json();
  },

  updateOneCategory: async (req, res) => {
    if (req.body.image_url) {
      const image = await cloudinary.uploader.upload(req.body.image_url, {
        folder: 'categories',
      })
      req.body.image_url = image.secure_url;
    }
    const id = req.params.id;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // avoid the update of the category if the name already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: req.body.name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const result = await prisma.category.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.status(200).json({ message: 'Category succesfully updated', result });
  }
}
