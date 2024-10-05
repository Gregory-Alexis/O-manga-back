const http = require('http');
const app = require('./app');
const cors = require("cors");
const router = require('./router/index');
require('dotenv').config();
const mockData = require('./mockData')

const port = (process.env.PORT || '5000');

app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

const server = http.createServer(app);

app.use(cors());

app.use(router)

server.on('error', errorHandler);

// execute in this order this to create mock data without foreign key constraints
async function createMockData() {
  await mockData.createCategories();
  await mockData.createUniverses();
  await mockData.createProducts();
  await mockData.createUsers();
  await mockData.createReviews();
  await mockData.createOrders();
  await mockData.createFavoriteCategories();
  await mockData.createFavoriteUniverses();
}

// createMockData();

server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
