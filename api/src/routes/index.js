const { Router } = require('express');
const axios = require('axios')
//const Country = require('../models/Country')
//const Tourist_activity = require ('../models/Tourist_activity')
const {Country,Tourist_activity,Op} = require('../db');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get(`/countries/:id`,async (req,res)=>{
    const {id} =req.params
    console.log(id)
    try {
        const country = await Country.findByPk(id)
        const tablaintermedia = await country.getTourist_activities()
        console.log(tablaintermedia)
        if (!country){
            res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.status(404).send('Country not found')
        }
        const envio = [country,tablaintermedia]
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(envio); 
    } catch (error) {
        console.log(error)
        
    }

})

router.get('/countries/',async (req,res)=>{
    try {
        const {name} = req.query
        if (name){
            const filtredCountries = await Country.findAll ({where:{name: { [Op.substring]: name }}})
            res.set('Access-Control-Allow-Origin', '*');
            return res.status(200).json(filtredCountries)
        }else{
            const amount = await Country.count()
            if (amount){
                const todosLosPaises = await Country.findAll()
                res.set('Access-Control-Allow-Origin', '*');
                return res.status(201).json(todosLosPaises)
            }else{
                var {data} = await axios.get(`https://restcountries.com/v3/all`)
                var nuevosPaises = data.map((a)=>  { 
                    return {id:a.cioc,flag:a.flags[0],name:a.name.common,region:a.region,capital:a.capital,subregion:a.subregion,area:a.area,population:a.population}})
            
                let arrayfiltrado = nuevosPaises.filter((i)=>i.name !== undefined && i.id !==undefined&&i.flag!==0 && i.region!==undefined && i.population!==undefined)
                arrayfiltrado= arrayfiltrado.map((i)=>{
                    return {...i,
                            capital:i.capital[0]}
                })    
                
                const paises = await Country.bulkCreate(arrayfiltrado)
        
                 
                return res.status(201).json(paises)

            }

        }
        
        
    } catch (error) {
        console.log(error)

        res.status(404).send('salio mal')
        
    }
})

router.post('/activities', async (req,res) => {
    const {activity,paises} = req.body
    try {
        //const relevant = await Country.findAll({where:{id:{[Op.or]:paises}}})
        const relevant = await Country.findAll({where:{[Op.or]:{id:{[Op.or]:paises},name:{[Op.or]:paises}}}})
        const activitys = await Tourist_activity.create(activity)
        
        if(activitys && relevant){
            const relation = await activitys.setCountries(relevant)
            res.set('Access-Control-Allow-Origin', '*');
            return res.status(201).send(relation)
        }
    } catch (error) {
        //return res.status(404).send(error)
        
        console.log(error)
        
    }

})

// rutas extras 

router.get('/activities',async(req,res) =>{
    try {
        const activities = await Tourist_activity.findAll()
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send(activities)
    } catch (error) {
        res.status(404).send('Peticion fallida')        
    }
})

router.get(`/activities/matched:name`,async (req,res)=>{
    const {name} =req.params
    console.log(name)
    try {
        const activity= await Tourist_activity.findOne({where:{name:name}})
        const tablaintermedia = await activity.getCountries()
        console.log(tablaintermedia)
        /* if (!country){
            res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.status(404).send('Country not found')
        } */
        //const envio = [tablaintermedia]
        res.set('Access-Control-Allow-Origin', '*'); 
        res.json(tablaintermedia); 
    } catch (error) {
        console.log(error)
        
    }

})






module.exports = router;
