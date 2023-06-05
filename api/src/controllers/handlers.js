const axios = require("axios");
const { Dog, DogTemperaments } = require("../db.js");
const { API_KEY, API_URL } = process.env;

//Se trae la información de la api
const dataApi = async () => {

  const apiDogs = await axios.get(`${API_URL}?api_key=${API_KEY}`)
  
  const infoDogs = await apiDogs.data.map(dog => {
    return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight.metric,
      height: dog.height.metric,
      life_span: dog.life_span,
      image: dog.image.url,
      temperaments: dog.temperament
    }
  })
  return infoDogs
}

//Se trae la información de la database

const dataDB = async () => {
  return await Dog.findAll({
    // Datos del dog y que incluyan los temperamentos asociados a ese dog
    include: {
      model: DogTemperaments,
      attributes: ['name'],
      through:{
        attributes: []
      }
    }
  })
}

//Se une toda la información
const getAll = async () => {
  const infoDataApi = await dataApi()
  const infoDataDB = await dataDB()
  const allData = infoDataApi.concat(infoDataDB)
  return allData
}

module.exports={
  dataApi,
  dataDB,
  getAll
}
