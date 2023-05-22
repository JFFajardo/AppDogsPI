
const {getAll} = require('./handlers')

const getDogs = async (req, res) =>{
    
    const dogName = req.query.name;
    const allDogs = await getAll()
            
    if(dogName) {
        const filteredDog = await allDogs.filter(dog => dog.name.toLowerCase().includes(dogName.toLowerCase()))
        filteredDog.length
        ? res.status(200).send(filteredDog)
        : res.status(404).send('Dog Not Found!!')
        console.log(filteredDog);
    } else {
        res.status(200).json(allDogs)
    }   
   
}
module.exports = {
    getDogs
};