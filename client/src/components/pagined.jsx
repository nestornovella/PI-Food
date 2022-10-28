import { useDispatch, useSelector } from "react-redux"
import { asignPage } from "../store/actions"
import Styles from "../styles/pagined.module.css"



export default function Pagined() {
    const maxPages = useSelector(state => state.maxPages) //255   //50 5
    const dispatch = useDispatch()

    const buttons = [] //[button, button]
    
    for (let i = 0; i < maxPages/9; i++) {
        buttons.push(<button className={Styles.buttons} onClick={handlePage} value={i}>{i+1}</button>)
    }
    
    function handlePage(e){
        dispatch(asignPage(e.target.value))   
    }
    


    return (
        <div  className={Styles.container}>
            {buttons.length && 
            buttons.map((b, i) => <div key={i}>{b}</div>)
            }
        </div>
    )
}