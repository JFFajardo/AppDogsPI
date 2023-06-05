const {Dog, DogTemperaments} = require('../db');

const postDog = async (req,res) => {
  
  try {
    const {name,image,height_min,height_max,weight_min,weight_max,life_span_min,life_span_max,temperaments, DB_created} = req.body;
  
    if(name && height_min && height_max && weight_min && weight_max) {
      const randomNumber = Math.floor(Math.random() * 1000)
      const newDog = await Dog.create({        
        name: name[0].toUpperCase() + name.slice(1),
        height: `${height_min} - ${height_max}`,
        weight: `${weight_min} - ${weight_max}`,
        life_span: life_span_min && life_span_max ? `${life_span_min} - ${life_span_max} years`: null,
        image: image ? image : `https://loremflickr.com/320/240/dog?random=${randomNumber}`,         
        DB_created
      })
      const temperamentAux = await DogTemperaments.findAll({
        where:{
          name: temperaments
        }
      })
      newDog.addDogTemperaments(temperamentAux);
      
      res.status(201).send('newDog created')
    }
    else res.status(400).send(`Bad Request`)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
 
}

module.exports = {
  postDog
}