const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const apiURL = 'https://min-api.cryptocompare.com/data/v2/histo';

app.use(express.static('./public'));

app.get('/price/:symbol', (req, res) => {
  let {limit, timeframe} = req.params;
  if (!timeframe) {
    timeframe = 'day';
  }
  if (!limit) {
    limit = 10;
  }

  axios.get(apiURL + timeframe, {
    params: {
      fsym: req.params.symbol,
      tsym: 'USD',
      limit: limit
    },
    headers: {
      Apikey: process.env.CRYPTOCOMPARE_KEY
    }
  }).then((response) => {
    res.status(200);
    res.send(response.data.Data);
  }).catch((error) => {
    res.status(400);
    res.send('Malformed request.');
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
