import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Styles from "../styles/detail.module.css"
import { getAllRecipes, recipeDetail, refreshAPI } from "../store/actions"
import Loading from "./loading"
import { capitalize } from "../functions/functions"
import { Link } from "react-router-dom"
import axios from "axios"

export default function DetailRecipe() {
    const recipe = useSelector(state => state.recipeDetail)
    const data = useSelector(state => state.allData)
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        dispatch(recipeDetail(id))
        if (!data.length) { dispatch(getAllRecipes()) }

    }, [data])

        function deleteRecipe (){
            axios.delete(`http://localhost:3001/api/recipes/${id}`)
            .then(response => console.log(response))
            .then(dispatch(refreshAPI()))
        }
  

    return (
        <div className={Styles.body}>
            {recipe ?
                <div className={Styles.cardRecipe}>
                    <div className={Styles.firstData}>
                        <img width={400} height={300} src={recipe.image} alt="" />
                        <div>
                            <div className={Styles.nameButton}>
                                <h2>{recipe.name && capitalize(recipe.name)}</h2>
                                <Link to={"/recipes"}><button>x</button></Link>
                            </div>
                            <h5>{`Id: ${recipe.id}`}</h5>
                            <div className={Styles.diets}>
                                <h4>Diets: </h4>
                                <p>{recipe.Diets?.map((e, i) => {
                                    return typeof e == "string" ? i < recipe.Diets.length - 1 ? `${capitalize(e)}, ` : e : i < recipe.Diets.length - 1 ? `${capitalize(e.name)}, ` : e.name
                                })}</p>
                            </div>
                            {recipe.dishTypes &&
                            <div className={Styles.diets}>
                                <h4>dishTypes: </h4>
                                <p>{recipe.dishTypes?.map((e, i) => {
                                    return typeof e == "string" ? i < recipe.dishTypes.length - 1 ? `${capitalize(e)}, ` : e : i < recipe.dishTypes.length - 1 ? `${capitalize(e.name)}, ` : e.name
                                })}</p>
                            </div>}
                            <div className={Styles.summary}>
                                <h4>Summary:</h4>
                                <p>{recipe.summary}</p>
                            </div>
                        </div>
                    </div>
                    <h2>STEPS...</h2>
                    {recipe.steps ? recipe.steps.map((e, i) => {
                        return <div key={i} className={Styles.steps}><h4>{`${i + 1})`}</h4><p>{e}</p></div>
                    }) : <h1>{"No Steps..."}</h1>}
                    {recipe.itsCreated && <Link to={"/recipes"}><button className={Styles.deleteButton} onClick={deleteRecipe}>🗑️</button></Link>}
                </div>
                :
                <div className={Styles.loading}>{<Loading />}</div>}
        </div>
    )
}