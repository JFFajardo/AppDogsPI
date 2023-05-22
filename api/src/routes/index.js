const { Router } = require('express');
const { getDogs } = require('../controllers/getDogs');
const { getDogById } = require('../controllers/getDogById')
const { postDog } = require('../controllers/postDog')
const { getTemperaments} = require('../controllers/getTemperaments');
const { deleteDog } = require('../controllers/deleteDog');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', (req, res) =>{
    getDogs(req, res);
})

router.get('/dogs/:id', (req, res) =>{
    getDogById(req, res);
})

router.post('/dogs', (req, res) =>{
    postDog(req, res);
})

router.get("/temperaments", (req, res)=>{
    getTemperaments(req, res);
})

router.delete("/dogs/:id", (req, res)=>{
    deleteDog(req, res)
})

module.exports = router;

