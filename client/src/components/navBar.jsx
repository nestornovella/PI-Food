import { useDispatch } from "react-redux"
import { search } from "../store/actions"
import Styles from "../styles/navBar.module.css"
import { Link } from "react-router-dom"

export default function NavBar() {
    const dispatch = useDispatch()

    function handleChange(e){
       dispatch(search(e.target.value))

    }

    return (
        <div className={Styles.navBar}>
            <input placeholder="Search a recipe..." onChange={handleChange} type="text" />
            <Link to={"/recipes/create"}><button></button></Link>
        </div>
    )
}