import { useState } from "react"
import Styles from "../styles/createRecipe.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllDiets, refreshAPI } from "../store/actions"
import defImage from "../img/ayuno.jpg"
import { getLengthOfObject, validations } from "../functions/functions"
import { Link } from "react-router-dom"
import axios from "axios"



export default function CreateRecipe() {

    const [input, setInput] = useState({
        name: "",
        summary: "",
        image: "",
        healthScore: 1,
        steps: [],
        diets: [],
        itsCreated: true,
    })
    const [error, setError] = useState({})
    const dispatch = useDispatch()
    const allDiets = useSelector(state => state.diets)

    useEffect(() => {
        if (!allDiets.length) {
            dispatch(getAllDiets())
        }
    })


    console.log(input.diets)


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        const validate = validations({ ...input, [e.target.name]: e.target.value })

        setError(validate)
    }

    function handleSteps_Diets(e) {

        if (e.target.name === "steps") {
            setInput({
                ...input,
                steps: [...input.steps, e.target.parentNode.childNodes[0].value]//e.target.parentNode.childNodes[1].value

            })
            e.target.parentNode.childNodes[0].value = ""

        }
        else {
            if (e.target.value) {
                setInput({
                    ...input,
                    [e.target.name]: [...input[e.target.name], e.target.value]
                })
            }
        }
    }

    function createRecipe(recipe) {
        axios.post("http://localhost:3001/api/recipes", recipe)
            .then(response => console.log(response))
    }


    function handleSubmit(e) {
        e.preventDefault()
        if (getLengthOfObject(error) === 0 && input.name && input.image && input.summary) {
            createRecipe(input)
            dispatch(refreshAPI())
            setInput({
                name: "",
                summary: "",
                image: "",
                healthScore: 1,
                steps: [],
                diets: []
            })
            alert("Recipe Created...")
        } else {
            setError({ ...error, submit: "⚠️ los campos requeridos deben estar completos" })
        }
    }

    function deleteDiet(e) {
        setInput({
            ...input,
            diets: input.diets.filter((diet, i) => i != e.target.value)
        })
        console.log(e.target.value)
    }

    function deleteSteps(e) {
        setInput({
            ...input,
            steps: input.steps.filter((step, i) => i != e.target.value)
        })
    }

    return (

        <div className={Styles.container}>
            <div className={Styles.mainContainer}>
                <div className={Styles.flex}>
                    <h2>NEW RECIPE...</h2>
                    <Link to={"/recipes"}><button type="button">Back</button></Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={Styles.lineOrder}>
                        <div className={Styles.divOrder}>
                            <label >Recipe Name:</label>
                            <input onChange={handleChange} name="name" value={input.name} placeholder={"Recipe name"} type="text" />
                            {<p>{error.name}</p>}
                        </div>

                        <div className={Styles.divOrder}>
                            <label >Url Image:</label>
                            <input onChange={handleChange} name="image" value={input.image} placeholder={"Examp: https://www.image.com"} type="text" />
                            {<p>{error.image}</p>}
                        </div>
                    </div>
                    <div className={Styles.divOrder}>
                        <label >Sumary:</label>
                        <textarea onChange={handleChange} name="summary" value={input.summary} placeholder={"Summary..."} cols="30" rows="5"></textarea>
                        {<p>{error.summary}</p>}
                    </div>
                    <div className={Styles.lineOrder}>

                        <div className={Styles.divOrder}>
                            <label>Steps:</label>
                            <div className={Styles.stepsAdd}>
                                <input name="steps" placeholder={"text.."} type="text" />
                                <button onClick={handleSteps_Diets} type="button" name="steps" >add step</button>
                            </div>
                        </div>

                        <div className={Styles.divOrder}>
                            <label className={Styles.healthScore} >Health Score:</label>
                            <input onChange={handleChange} name="healthScore" value={input.healthScore} placeholder={"range [1-100]"} type="number" min={1} max={100} />
                        </div>
                    </div>


                    <select name="diets" onChange={handleSteps_Diets}>
                        <option value={""}>Select a diet...</option>
                        {allDiets.length && allDiets.map(diet => {
                            return <option key={diet.id} value={diet.name}>{diet.name}</option>
                        })}
                    </select>

                    <div className={Styles.divButtons}>
                        <button type="submit">Create</button>

                    </div>
                    {<div className={Styles.divOrder}><p>{error.submit}</p></div>}
                </form>




            </div>
            <div>
                <div className={Styles.lastContainer}>
                    <div className={Styles.flex}>
                        <h2>{input.name ? input.name : "PREV VIST..."}</h2>
                        <h2>HScore: {input.healthScore}</h2>
                    </div>
                    <div className={Styles.contentVist}>
                        <img width={313} src={input.image ? input.image : defImage} alt="" />
                        <div className={Styles.imageDiet}>
                            <div>
                                <h5>-Diets...</h5>
                                {input.diets && input.diets.map((e, i) => {
                                    return (<button key={i} className={Styles.diet} value={i} onClick={deleteDiet}>{e}</button>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={Styles.steps}>
                        <h5>Steps...</h5>
                        {input.steps && input.steps.map((step, i) => {
                            return <div key={i} ><button onClick={deleteSteps} value={i}>🗑️</button><p>{i + 1}</p><p>{step}</p></div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}