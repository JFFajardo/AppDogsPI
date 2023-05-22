
const {DogTemperaments} = require('../db');
const { dataApi } = require('./handlers')

const getTemperaments = async (req, res) =>{
    // try {        
    //     const {dataApi} = await axios.get(`${API_URL}?api_key=${API_KEY}`);

    //     let temperaments = []

    //     const temp = dataApi.map(breed => breed.temperament)

    //     temp.forEach(element => {
    //         if(element) temperaments = [...temperaments, ...element.split(', ')]
    //     });

    //     temperaments = [...new Set(temperaments)].sort();

    //     const  newTemps = temperaments.map(element => {return {name: element}})

    //     const tempsCount = await DogTemperaments.count()

    //     if(!tempsCount) await DogTemperaments.bulkCreate(newTemps)

    //     const tempsDB = await DogTemperaments.findAll()
           
    //     return res.status(200).json(tempsDB);
    // }
    // catch(error){
    //     res.status(500).send(error.message)       
    // }

    const infoApi = await dataApi()
    const temperaments = infoApi.map(dog => dog.temperaments).join().split(',')
    let temperamentsForDB = temperaments.map(e => e.trim())
    temperamentsForDB = [...new Set(temperamentsForDB)].sort();
    temperamentsForDB.forEach(element => {
    if(element) {
      DogTemperaments.findOrCreate({ //método de sequelize. va a buscar el elemento en la tabla, si no lo encuentra crea la nueva entrada
        where: {
          name: element
        }
      })
    }
  })
  // const tempsCount = await DogTemperaments.count()

  // if(!tempsCount) await DogTemperaments.bulkCreate(temperamentsForDB)
  
  const allTemperaments = await DogTemperaments.findAll()
  res.status(200).send(allTemperaments)
}
module.exports = {
    getTemperaments
};