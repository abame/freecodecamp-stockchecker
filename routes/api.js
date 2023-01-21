'use strict';

const { createStock, saveStock, findStock } = require('../controller/database');
const requestData = require('../controller/request-data');
const bcrypt = require("bcrypt");
const hasIpVoted = require('../controller/ip-vote');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const hasMoreThanOneStock = Array.isArray(req.query.stock);
      const firstStock = hasMoreThanOneStock ? req.query.stock[0] : req.query.stock;
      const secondStock = hasMoreThanOneStock ? req.query.stock[1] : null;
      const ipAddress = await bcrypt.hash(req.ip, 13);
      const like = req.query.like === "true";

      const firstResponse = await requestData(firstStock);

      let firstStockFromDB = await findStock(firstStock);
      if (!firstStockFromDB) {
        firstStockFromDB = createStock(firstResponse.stock, firstResponse.price);
      }

      const ipHasVotedFirstStock = await hasIpVoted(req.ip, firstStockFromDB.ipAdresses);
      if (like && !ipHasVotedFirstStock) {
        firstStockFromDB.ipAdresses.push(ipAddress);
        firstStockFromDB.likes++;
      }
      saveStock(firstStockFromDB);

      if (!hasMoreThanOneStock) {
        res.json({
          stockData: {
            ...firstResponse,
            likes: firstStockFromDB.likes
          }
        });
        return;
      }

      const secondResponse = secondStock !== null ? await requestData(secondStock) : null;

      let secondStockFromDB = await findStock(secondStock);
      if (!secondStockFromDB) {
        secondStockFromDB = createStock(secondResponse.stock, secondResponse.price);
      }

      const ipHasVotedSecondStock = await hasIpVoted(req.ip, secondStockFromDB.ipAdresses);
      if (like && !ipHasVotedSecondStock) {
        secondStockFromDB.ipAdresses.push(ipAddress);
        secondStockFromDB.likes++;
      }
      saveStock(secondStockFromDB);

      res.json({
        stockData: [
          { ...secondResponse, rel_likes: secondStockFromDB.likes },
          { ...firstResponse, rel_likes: firstStockFromDB.likes }
        ]
      });
    });
};
