const {DogTemperaments} = require('../db');

const postTemperament = async (req,res) => {
    
    const {name} = req.body;

    try {

        const temperamentCreated = await DogTemperaments.create
        
        ({name})

        return res.status(201).json(temperamentCreated)
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = {
    postTemperament
}