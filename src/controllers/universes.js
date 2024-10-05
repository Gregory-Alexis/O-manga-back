const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');

module.exports = {
  getAllUniverses: async (req, res) => {
    const result = await prisma.universe.findMany(
      {
        orderBy: [{ id: 'asc' }],
      }
    )
    res.status(200).json(result)

  },
  getOneUniverse: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.universe.findUnique({
      where: { id: parseInt(id) },
      include: { products: true },
    });

    if (!result) {
      return res.status(404).json({ message: "Universe not found" });
    }

    res.status(200).json(result);

  },
  createUniverse: async (req, res) => {
    if (!req.body.image_url) {
      return res.status(400).json({ message: 'Image url is required' });
    }

    // avoid the creation of the universe if the name already exists
    const existingUniverse = await prisma.universe.findFirst({
      where: {
        name: req.body.name,
      },
    });

    if (existingUniverse) {
      return res.status(400).json({ message: "Universe already exists" });
    }

    const image = await cloudinary.uploader.upload(req.body.image_url, {
      folder: 'universes',
    })

    const result = await prisma.universe.create({
      data: {
        ...req.body,
        image_url: image.secure_url,
      },
    });

    res.status(201).json({ message: 'Universe succesfully created', result });

  },
  deleteOneUniverse: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.universe.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).json();

  },
  updateOneUniverse: async (req, res) => {
    if (req.body.image_url) {
      const image = await cloudinary.uploader.upload(req.body.image_url, {
        folder: 'universes',
      })
      req.body.image_url = image.secure_url;
    }
    const id = req.params.id;
    const universe = await prisma.universe.findUnique({
      where: { id: parseInt(id) },
    });

    if (!universe) {
      return res.status(404).json({ message: "Universe not found" });
    }

    // avoid the update of the universe if the name already exists
    const existingUniverse = await prisma.universe.findFirst({
      where: {
        name: req.body.name,
      },
    });

    if (existingUniverse) {
      return res.status(400).json({ message: "Universe already exists" });
    }


    const result = await prisma.universe.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.status(200).json({ message: 'Universe succesfully updated', result });

  }
};
