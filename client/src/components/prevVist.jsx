import Styles from "../styles/prevVist.module.css"





export default function PrevVist(image){


    return(
        <div className={Styles.lastContainer}>
            <img src={image && image} alt="" />
        </div>
    )
}