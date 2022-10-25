import Styles from "../styles/errorPage.module.css"
import image from "../img/Error404.png"
import {Link} from "react-router-dom"

export default function ErrorPage() {
    return (
        <div className={Styles.container}>
            <div className={Styles.imageButton}>
                <img src={image} alt="" />
                <Link to={"/"}><button>Return...</button></Link>
            </div>
        </div>
    )
}