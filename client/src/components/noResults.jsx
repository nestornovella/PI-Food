import image from "../img/ayuno.jpg"
import Styles from "../styles/cardRecipe.module.css"


export default function NoResults() {

    return (
        <div className={Styles.CardRecipe}>
            <img src={image} alt="" />
            <h4>NO RESULTS...</h4>
        </div>
    )
}