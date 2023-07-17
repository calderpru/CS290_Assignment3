'use strict';

const PORT = 3000;

// The variable stocks has the same value as the variable stocks in the file 'stocks.js'
const stocks = require('./stocks.js').stocks;

const express = require("express");
const app = express();


app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
// Note: Don't add or change anything above this line.


// Stock Order 
function findStockBySymbol(symbol) {
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].symbol === symbol) {
        return stocks[i];
      }
    }
    return null;
  }


app.post("/order", (req, res) => {
    const symbol = req.body.symbol;
    const quantity = req.body.quantity;

    const selectedStock = findStockBySymbol(symbol);
    const totalPrice = selectedStock.price * quantity;

    res.send(`Ordered ${quantity} shares of ${symbol} -- Pruchase Total: ${totalPrice}`);
  });


  app.post('/search', (req, res) => {
    const searchCriterion = req.body.search; 
  
    const findStockByPrice = (criterion) => {
      if (criterion === 'highest-price') {
        let highestStock = stocks[0];
        for (let i = 1; i < stocks.length; i++) {
          if (stocks[i].price > highestStock.price) {
            highestStock = stocks[i];
          }
        }
        return highestStock;
      } else if (criterion === 'lowest-price') {
        let lowestStock = stocks[0];
        for (let i = 1; i < stocks.length; i++) {
          if (stocks[i].price < lowestStock.price) {
            lowestStock = stocks[i];
          }
        }
        return lowestStock;
      }
    };
  
    const stock = findStockByPrice(searchCriterion);
  
    res.send(stock);
  });


// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});