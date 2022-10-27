import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllRecipes, maxPages } from "../store/actions"
import CardRecipe from "./cardRecipe"
import Loading from "./loading"
import Styles from "../styles/cardRecipe.module.css"
import NoResults from "./noResults"



export default function Home (){
    const recipes = useSelector(state => state.filtredData) //renderizo
    const allData = useSelector(state => state.allData) //copia
    const page = useSelector(state => state.page)
    const pages =useSelector(state=>state.maxPages)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(maxPages())
        if(!allData.length){
            dispatch(getAllRecipes())
        } 
    })

   

    console.log(pages)

    return (
        <div className={Styles.renderRecipes}>
        {recipes.length>0 ?
        recipes.map((e, i)=> {
           
            return(
                i >= page * 9
                &&
                i < (page * 9) + 9
                &&
                <div key={e.id} className={Styles.CardRecipe}>
                 <CardRecipe  scores={e.healthScore} name={e.name} dishTypes={e.dishTypes} diets={e.Diets} id={e.id} image={e.image}/>
            </div>)
        }) : !allData.length>0 ? <Loading/> : <NoResults/> }
        </div>
    ) // filtredData:[]   alldata:[]  
   
}

// condicion ? hace esto : (verificaesto ? hace esto : hace lo otro) 