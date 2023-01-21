const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    stockName: {
      type: String,
    },
    price: {
      type: Number
    },
    likes: {
      type: Number
    },
    ipAdresses: [{
      type: String
    }]
  }
);

const Stock = mongoose.model('Stock', stockSchema)

module.exports = { Stock };