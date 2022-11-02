import { capitalize } from "../functions/functions"
import Styles from "../styles/cardRecipe.module.css"
import {Link} from "react-router-dom"

export default function CardRecipe({ id, name, diets, image, scores, dishTypes }) {


    return (
        <div className={Styles.container}>
            <img height={231} width={313} src={image} alt={name} />
            <h5>{`Id: ${id}`}</h5>
            <h3>{capitalize(name)}</h3>
            {dishTypes&&
            <div className={Styles.dishTypes}>
                
                
                <h4>dishTypes:</h4>
                <p>{dishTypes.map((e, i) => {
                    return typeof e == "string" ? i < dishTypes.length - 1 ? `${capitalize(e)}, ` : e : i < dishTypes.length - 1 ? `${capitalize(e.name)}, ` : e.name
                })}</p>
            </div>}
            <div className={Styles.diets}>
                <h4>Diets:</h4>
                <p>{diets.map((e, i) => {
                    return typeof e == "string" ? i < diets.length - 1 ? `${capitalize(e)}, ` : e : i < diets.length - 1 ? `${capitalize(e.name)}, ` : e.name
                })}</p>
            </div>
            <div className={Styles.scoreMore}>
                <p className={
                    scores < 40 ? Styles.scoresDanger : scores === 40 || scores < 60 ? Styles.scoresYellow : Styles.scoresGood
                }>Scores: {scores}</p>
               <Link to={`/recipes/detail/${id}`}><p>More...</p></Link>
            </div>

        </div>
    )
}