const {DogTemperaments} = require('../db');
const { dataApi } = require('./handlers')

const getTemperaments = async (req, res) =>{
  
    const infoApi = await dataApi()
    const temperaments = infoApi.map(dog => dog.temperaments).join().split(',')
    let temperamentsForDB = temperaments.map(e => e.trim())
    
    temperamentsForDB = [...new Set(temperamentsForDB)].sort();
    temperamentsForDB.forEach(element => {
    if(element) {
      DogTemperaments.findOrCreate({
        where: {
          name: element
        }
      })
    }
  })
  
  const allTemperaments = await DogTemperaments.findAll()
  res.status(200).send(allTemperaments)
}
module.exports = {
    getTemperaments
};