import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changePage, filtredAllData, filtredByDiets, getAllDiets, itsCreatedData } from "../store/actions"
import Styles from "../styles/filter.module.css"

export default function FilterRecipe (){
    const dispatch = useDispatch()

    const page = useSelector(state => state.page)
    const diets = useSelector(state=> state.diets)
   

    useEffect(()=>{
        if(!diets.length){
        dispatch(getAllDiets())}
    })

    function handlePage(e){
        e.target.name === "last"?
        dispatch(changePage(page > 0 ? parseInt(page)-1 : 0))
        :
        dispatch(changePage( parseInt(page)+1))
    }

    function orderHandler(e){
        dispatch(filtredAllData(e.target.value))
    }

    function filtredHandler(e){
        dispatch(filtredByDiets(e.target.value))
    }

    function itsCreatedHandler(e){
        dispatch(itsCreatedData(e.target.value))
        
    }

//      ["A_Z", "Z_A","score-Asc","score-Desc"]
    return (<div className={Styles.filter}>
        <select onChange={itsCreatedHandler}>
            <option value="All_recipes">All recipes</option>
            <option value="Created">Created</option>
            <option value="Not_Created">Not Created</option>
        </select>
        <select onChange={orderHandler}>
            <option value="">order By...</option>
            <option value="A_Z">A to Z</option> 
            <option value="Z_A">Z to A</option>
            <option value="score-Asc">H.Score Asc</option>
            <option value="score-Desc">H.Score Dsc</option>
        </select>
        <button name="last" onClick={handlePage} className={Styles.lastButton}></button>
        <div className={Styles.counterPage}>{parseInt(page)+1}</div>
        <button name="next" onClick={handlePage} className={Styles.nextButton}></button>
        <select onChange={filtredHandler}>
            <option value={"all-Diets"} >All diets.</option>
            {diets.length &&
            diets.map(d => {
                return <option key={d.id} value={d.name}>{d.name}</option>
            })
            }
        </select>
    </div>)
}