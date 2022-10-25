const { Router } = require("express")
const {idCreator} = require("../functions/functions.js")
const {Favourites} = require("../db.js")

const router = Router()

const throwError = (mssj) => { throw mssj }


router.get("/", async (req, res, next)=>{
    const allData = await Favourites.findAll()
    try {
        allData.length ?
        res.json(allData)
        : throwError("No data.")
        
    } catch (error) {
        next(error)
    }
})


router.post("/", async(req, res, next) =>{
    const { name } = req.body

    try {
    
        const recipe = await Favourites.findOrCreate({where:{name:name.toLowerCase()}, defaults:{ id:idCreator(), name:name.toLowerCase()}}) 
        recipe ? res.json(recipe[0]) : throwError("elements not finded")
        console.log(await finded)
    } catch (error) {
        next(error)
    }   
})

router.delete("/", async(req, res) =>{
    const { id } = req.body

    try {
        const deleted = await Favourites.destroy({where:{id: id}})
        res.json(`se han eliminado ${deleted} recetas favoritas`)
        
    } catch (error) {
        
    }
})

module.exports = router