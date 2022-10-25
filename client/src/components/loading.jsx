import imagen from "../img/logo.png"
import "./loadin.css"


export default function Loading (){



    return(
        <div className="loading">
            <img src={imagen} alt="" />
        </div>
    )
}