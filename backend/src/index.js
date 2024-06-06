require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Ajoutez cette ligne pour vérifier


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const salesRouter = require('./routes/sales');
const purchasesRouter = require('./routes/purchases');

app.use('/sales', salesRouter);
app.use('/purchases', purchasesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

