const { Dog } = require("../db")


const deleteDog = async (req, res) => {

    const id = req.params.id
    try {
      if (id) {
        const deleteDog = await Dog.findOne({
          where: {id: id}
        })
        if (deleteDog) {
          await deleteDog.destroy()
          res.status(200).send('Dog delete')
        }
        else res.status(404).status('Dog id not found')
      } else res.status(400).send('Something went wrong')
    } catch (e) {
      res.status(400).send('Dog ID is wrong typed')
    } 
}

module.exports = {
    deleteDog
};