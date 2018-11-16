const foodFair = {
  'Vienna': 'Wiener Schnitzel',
  'San Juan': 'Mofongo'
}

const initializeCityDatabase = () => {
  console.log('initializeCityDatabase')
}
const clearCityDatabase = () => {
  console.log('clearCityDatabase')
}
const isCity = (city) => {
  return city
}
const isValidCityFoodPair = (city, food) => foodFair[city] === food

const initializeFoodDatabase = () => {
  console.log('initializeFoodDatabase')
}


module.exports = { 
  initializeCityDatabase,
  initializeFoodDatabase,
  clearCityDatabase,
  isValidCityFoodPair,
  isCity
}