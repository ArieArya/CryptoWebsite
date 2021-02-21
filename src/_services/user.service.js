const axios = require('axios');

axios.defaults.baseURL = "http://ec2-18-141-172-157.ap-southeast-1.compute.amazonaws.com"

export const userService = {
  getTopCoin,
  getCoinHourly,
  getTopHourly,
  getAllCoin
};

function getTopCoin(top, period) {
  return axios.get('/query/topScore='+top+'/timePeriod='+period)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

function getTopHourly(combine_multiplier, period) {
  return axios.get('/query/hourlyData=5/timePeriod='+period+'/combinedData='+combine_multiplier)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

function getCoinHourly(coin_symbol, period) {
  return axios.get('/query/coinHourlyData='+coin_symbol+'/timePeriod='+period)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

function getAllCoin() {
  return axios.get('/query/allSymbols')
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}