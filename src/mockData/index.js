const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
  createUsers: async () => {
    console.log('Creating users...')
    const users = [];
    for (let i = 0; i < 30; i++) {
      const user = await prisma.user.create({
        data: {
          firstname: faker.person.firstName(),
          lastname: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          image_url: faker.image.avatar(),
          city: faker.location.city(),
          zip_code: faker.location.zipCode(),
          reviews: {
            create: {
              content: faker.lorem.paragraph(),
              rating: faker.number.int({ min: 1, max: 5 }),
              product_id: faker.number.int({ min: 1, max: 30 }),
            },
          },
          orders: {
            create: {
              order_date: faker.date.past(),
              archeving_date: faker.date.past(),
              product_quantity: faker.number.int({ min: 1, max: 200 }),
              product_id: faker.number.int({ min: 1, max: 30 }),
            },
          },
          favorite_categories: {
            create: {
              category_id: faker.number.int({ min: 1, max: 30 }),
            },
          },
          favorite_universes: {
            create: {
              universe_id: faker.number.int({ min: 1, max: 30 }),
            },
          },
        },
      });
      users.push(user);
    }
    return users;
  },

  createCategories: async () => {
    console.log('Creating categories...')
    const categories = [];
    for (let i = 0; i < 30; i++) {
      const category = await prisma.category.create({
        data: {
          name: faker.commerce.department(),
          image_url: faker.image.url(),
        },
      });
      categories.push(category);
    }
    return categories;
  },

  createUniverses: async () => {
    console.log('Creating universes...')
    const universes = [];
    for (let i = 0; i < 30; i++) {
      const universe = await prisma.universe.create({
        data: {
          name: faker.commerce.productMaterial(),
          image_url: faker.image.url(),
        },
      });
      universes.push(universe);
    }
    return universes;
  },

  createReviews: async () => {
    console.log('Creating reviews...')
    const reviews = [];
    for (let i = 0; i < 30; i++) {
      const review = await prisma.review.create({
        data: {
          content: faker.lorem.paragraph(),
          rating: faker.number.int({ min: 1, max: 5 }),
          user_id: faker.number.int({ min: 1, max: 30 }),
          product_id: faker.number.int({ min: 1, max: 30 }),
        },
      });
      reviews.push(review);
    }
    return reviews;
  },

  createProducts: async (categories, universes) => {
    console.log('Creating products...')
    const products = [];
    for (let i = 0; i < 30; i++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          stock: faker.number.int({ min: 0, max: 1000 }),
          description: faker.commerce.productDescription(),
          price: faker.number.float({ precision: 0.01 }),
          image_url: faker.image.url(),
          category_id: faker.number.int({ min: 1, max: 30 }),
          universe_id: faker.number.int({ min: 1, max: 30 }),
        },
      });
      products.push(product);
    }
    return products;
  },

  createOrders: async (users, products) => {
    console.log('Creating orders...')
    const orders = [];
    for (let i = 0; i < 30; i++) {
      const order = await prisma.order.create({
        data: {
          order_date: faker.date.past(),
          archeving_date: faker.date.past(),
          product_quantity: faker.number.int({ min: 1, max: 200 }),
          product_id: faker.number.int({ min: 1, max: 30 }),
          user_id: faker.number.int({ min: 1, max: 30 }),
        },
      });
      orders.push(order);
    }
    return orders;
  },

  createFavoriteCategories: async (users, categories) => {
    console.log('Creating favorite categories...')
    const favoriteCategories = [];
    for (let i = 0; i < 30; i++) {
      const favoriteCategory = await prisma.favoriteCategory.create({
        data: {
          user_id: faker.number.int({ min: 1, max: 30 }),
          category_id: faker.number.int({ min: 1, max: 30 }),
        },
      });
      favoriteCategories.push(favoriteCategory);
    }
    return favoriteCategories;
  },

  createFavoriteUniverses: async (users, universes) => {
    console.log('Creating favorite universes...')
    const favoriteUniverses = [];
    for (let i = 0; i < 30; i++) {
      const favoriteUniverse = await prisma.favoriteUniverse.create({
        data: {
          user_id: faker.number.int({ min: 1, max: 30 }),
          universe_id: faker.number.int({ min: 1, max: 30 }),
        },
      });
      favoriteUniverses.push(favoriteUniverse);
    }
    return favoriteUniverses;
  },
};
