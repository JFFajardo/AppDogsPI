
const {getAll} = require('./handlers')

const getDogById = async (req, res) =>{
    try {
        const dogId = req.params.id;
        const allDogs = await getAll();
        
        if(dogId) {
            const filteredDog = allDogs.find(dog => dog.id == dogId);
            filteredDog
            ? res.status(200).send(filteredDog)
            : res.status(404).send('Dog not Found!!')
        }
    }
    catch(error){
        res.status(500).send(error.message)       
    }
}
module.exports = {
    getDogById
};