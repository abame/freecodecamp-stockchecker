const axios = require('axios');

const requestData = async (stock) => {
    try {
      const response = (await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`)).data;
      return {stock: response.symbol, price: response.latestPrice};
    } catch (error) {
      console.log(error);
      return { stock: stock, price: 0 };
    }
}

module.exports = requestData
