import Styles from "../styles/landinPage.module.css"
import {Link} from "react-router-dom"


export default function LandingPage(){


    return(
        <div className={Styles.container}>
           <div className={Styles.msj}>
            <h2>Welcome to another foods PI</h2>
            <p>my name is Nestor and i made this PI with love</p>
            <p>really enjoy working and consolidating concepts studied along this path. thank you and let's cook!</p>
           </div>
           <Link to={"/recipes"}><button>Show me...</button></Link>
        </div>
    )
}