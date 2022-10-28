const { Router } = require('express');
const axios = require("axios")
const router = Router();
const { API_KEY, API_KEY1, API_KEY2 } = require("../db.js");
const { Recipe, Diets } = require("../db.js")
const jsonData = require("../search.json");
const { idCreator } = require('../functions/functions.js');

//                   -------------FUNCTIONS-------------


const getRecipes = async () => {
    
    try {
        // const SponacoolarDb = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        // const finalData =  SponacoolarDb.data.results?.map(recipe => {
            const finalData = jsonData.results?.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.title.toLowerCase(),
                summary: recipe.summary.replace(/\<.*?\>/gi, ""), //regular expresions
                healthScore: recipe.healthScore,
                steps: recipe.analyzedInstructions[0]?.steps.map((r) => r.step),
                image: recipe.image,
                dishTypes:recipe.dishTypes,
                Diets: recipe.diets
            }
        })
        return finalData

    } catch (error) {
        return error
    }
}

const throwError = (mssj) => { throw mssj }

const getAllrecipes = async () => {
    const database = await Recipe.findAll({
        include: { model: Diets }
    })
    const databaseExt = await getRecipes()
    const allRecipes = [...databaseExt, ...database]
    return allRecipes

}



//               -------------ROUTES-------------

router.get("/", async (req, res, next) => {

    const { name } = req.query
    const allRecipes = await getAllrecipes()

    if (!name) {
        try {
            // setTimeout(()=>{
            //     res.status(200).json( allRecipes)

            // }, 2000)
            res.status(200).json( allRecipes)
        } catch (error) {
            next(error)
        }
    } else {
        try {
            let allRecipesbyName = allRecipes.filter(r => r.name.includes(name))

            allRecipesbyName ? res.status(200).json(allRecipesbyName) : throwError("there are not recipe matches.")

        } catch (error) {
            next(error)
        }


    }
})


router.get("/myrecipes", async (req, res, next) => {
    const totalRecipes = await getAllrecipes()
    const createdRecipes = await totalRecipes.filter(r => r.itsCreated)
    try {
        createdRecipes.length ? res.status(200).json(createdRecipes) : throwError("no recipes created.")
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {

    const { id } = req.params
    const allRecipes = await getAllrecipes()
    try {
        let recipe = allRecipes.filter(r => r.id == id)
        recipe ? res.status(200).json(recipe) : throwError("there are no recipes with that id")
    } catch (error) {
        next(error)
    }
}
)


router.post("/", async (req, res, next) => {
    const { name, summary, healthScore, steps, image, diets, itsCreated } = req.body
    try {
        if (name, summary, healthScore, steps, image, itsCreated, diets) {

            const id = idCreator(true)

            const newRecipe = await Recipe.create({ id: id, name, summary, healthScore:parseInt(healthScore), steps, image, itsCreated })


            diets.map( async d => {
                try {
                    const diet = await Diets.findOne({
                        where:{
                            name: d
                        }
                    })
                    newRecipe.addDiets(await diet.id)
                } catch (error) {
                    next(error)
                }
            })


          res.json({ msj: "La receta fue creada con exito." })
        } else { throwError("Parameters were missing or incorrect.") }

    } catch (error) {
        next(error)
    }

})


router.delete("/:id", async(req, res, next)=>{
    const { id } = req.params

    try {
        const deleted = await Recipe.destroy({where:{id:id}})
        deleted ? res.status(202).json(`You have eliminated ${deleted} recipes`) : throwError("Could not delete the recipe.") 
    } catch (error) {
        next(error)
    }
})

router.put("/:id",async (req, res, next )=>{
    const {id} =req.params
    try {
       
        const update =  await Recipe.update(req.body, {where:{id: id}})
       console.log(update[0])
       update[0] ? res.json("your recipe was updated.") : throwError("can´t update the recipe.")
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;
