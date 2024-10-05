const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { SendMailToShopOwnerOnOrder } = require('../utils/sendMail');

module.exports = {
  getAllOrders: async (req, res) => {
    const result = await prisma.order.findMany(
      {
        orderBy: [{ id: 'asc' }],
      }
    );
    res.status(200).json(result);
  },
  getOneOrder: async (req, res) => {
    const id = req.params.id;

    const result = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    const user = await prisma.user.findUnique({
      where: { id: req.body.user_id },
    });

    if (user.role === 'USER' && result.user_id !== req.body.user_id) {
      return res.status(403).json({ message: "You are not authorised to access to this order" });
    }

    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(result);
  },
  getAllOrdersByUser: async (req, res) => {
    const user_id = parseInt(req.params.userId);

    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await prisma.order.findMany({
      where: { user_id },
      orderBy: [{ id: 'asc' }],
    });

    res.status(200).json(orders);
  },
  createOrder: async (req, res) => {
    const result = await prisma.order.create({
      data: req.body,
    });

    SendMailToShopOwnerOnOrder(result);
    res.status(201).json({ message: 'Order succesfully created', result });
  },
  deleteOneOrder: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.order.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json();

  },
  updateOneOrder: async (req, res) => {
    const id = req.params.id;
    const result = await prisma.order.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.status(200).json({ message: 'Order succesfully updated', result });
  },
};
