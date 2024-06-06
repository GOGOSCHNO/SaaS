const mongoose = require('mongoose');
require('dotenv').config();

const Sale = require('./src/models/Sale');
const Purchase = require('./src/models/Purchase');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const clearCollections = async () => {
  try {
    await Sale.deleteMany({});
    console.log('Sales collection cleared');
    await Purchase.deleteMany({});
    console.log('Purchases collection cleared');
  } catch (error) {
    console.error('Error clearing collections:', error);
  } finally {
    mongoose.connection.close();
  }
};

clearCollections();
