const { Stock } = require("../models/stock");

const createStock = (stock, price) => {
    return new Stock({
        stockName: stock,
        price,
        ipAdresses: [],
        likes: 0
    });
}

const saveStock = async (stock) => {
    return await stock.save(function (err) {
        if (err) return console.log(err);
    });
}

const deleteAllStock = async () => {
    return await Stock.deleteMany();
}

const findStock = async (stockName) => {
    return await Stock.findOne({ stockName }).exec();
}

module.exports = { createStock, saveStock, findStock, deleteAllStock }
