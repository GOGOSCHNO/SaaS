const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
require('dotenv').config();

const Sale = require('./src/models/Sale');
const Purchase = require('./src/models/Purchase');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Function to read CSV and insert data into MongoDB
const importCSV = (model, filePath, isSale = true) => {
  return new Promise((resolve, reject) => {
    const records = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim() }))  // Spécifier le point-virgule comme délimiteur et nettoyer les en-têtes
      .on('data', (data) => {
        // Nettoyer les champs individuels
        Object.keys(data).forEach(key => data[key] = data[key] && data[key].trim());

        // Transformation des données
        if (data.serviceValue) {
          data.serviceValue = parseInt(data.serviceValue.replace(/\s/g, ''), 10);  // Retirer les espaces et convertir en nombre
        }
        if (data.price) {
          data.price = parseInt(data.price.replace(/\s/g, ''), 10);  // Retirer les espaces et convertir en nombre
        }
        if (data.quantity) {
          data.quantity = parseInt(data.quantity.replace(/\s/g, ''), 10);  // Retirer les espaces et convertir en nombre
        }
        if (data.date) {
          data.date = new Date(data.date.split('/').reverse().join('-'));  // Convertir la date en format compatible
        }

        // Validation des données
        if (isSale) {
          if (data.customerName && data.service && !isNaN(data.serviceValue) && data.paymentMethod && !isNaN(data.date.getTime())) {
            records.push(data);
          } else {
            console.warn('Invalid record:', data);
          }
        } else {
          if (data.category && !isNaN(data.quantity) && !isNaN(data.price) && data.productName && data.supplier && !isNaN(data.date.getTime())) {
            records.push(data);
          } else {
            console.warn('Invalid record:', data);
          }
        }
      })
      .on('end', async () => {
        try {
          const docs = await model.insertMany(records);
          resolve(docs);
        } catch (err) {
          reject(err);
        }
      });
  });
};

const importData = async () => {
  try {
    await importCSV(Sale, './data/sales.csv');
    console.log('Sales data imported successfully');
    await importCSV(Purchase, './data/purchases.csv', false);
    console.log('Purchases data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    mongoose.connection.close();
  }
};

importData();
