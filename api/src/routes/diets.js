const {Router} = require("express")
const router = Router()
const dbext = require("../search.json")
const {Diets} = require("../db.js")
const { idCreator } = require("../functions/functions")


//         ----------FUNCTIONS---------

const getAllDiets = ()=>{ //obtengo todas las dietas
    const diets =  dbext.results.map(r => r.diets)
    const allDiets = new Set([...diets.flat(), "vegetarian"])
    //console.log(allDiets)
    return[...allDiets].map(e => new Object({"name":e, id:idCreator(false)}))
}
const throwError = (mssj) => { throw mssj }

getAllDiets()
router.get("/",async (req, res, next)=>{
    let diets = await getAllDiets()
    
    try {
        diets.forEach(e => Diets.findOrCreate({
            where:{
                name:e.name
            },
            defaults:{name: e.name, id: e.id}
        }) )
        
        diets.length ? res.json(await Diets.findAll()) : throwError("no diets were found in the db.")
    } catch (error) {
        next(error) 
    }
})


module.exports=router