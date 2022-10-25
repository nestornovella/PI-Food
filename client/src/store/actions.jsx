import axios from "axios"

export const GET_ALL_RECIPES = "GET_ALL_RECIPES"
export const GET_ALL_DIETS = "GET_ALL_DIETS"
export const PAGE_CHANGE = "PAGE_CHANGE"
export const MAX_PAGES = "MAX_PAGES"
export const ORDER_ALL_DATA = "FILTRED_ALL_DATA"
export const FILTRED_BY_DIETS = "FILTRED_BY_DIETS"
export const SEARCH = "SEARCH"
export const RECIPE_DETAIL = "RECIPE_DETAIL"
export const REFRESH_API = "REFRESH_API"
export const ITS_CREATED_DATA = "ITS_CREATED_DATA"

export function getAllRecipes (){
    return function(dispatch){
        axios.get("http://localhost:3001/api/recipes")
        .then(response => dispatch({type:GET_ALL_RECIPES, payload:response.data}))
    }
}

export function getAllDiets (){
    return function(dispatch){
        axios.get("http://localhost:3001/api/diets")
        .then(response => dispatch({type:GET_ALL_DIETS, payload:response.data}))
    }
}

export function refreshAPI (){
    return {
        type:REFRESH_API
    }
} 

export function changePage(value){
    return{
        type:PAGE_CHANGE,
        payload:value
    }
}

export function maxPages (){
    return {
        type:MAX_PAGES,
    }
} 


export function filtredAllData(action){
    return {
        type: ORDER_ALL_DATA,
        payload: action
    }
}

export function search (search){
    return {
        type:SEARCH,
        payload: search
    }
} 

export function filtredByDiets(action){
    return{
        type:FILTRED_BY_DIETS,
        payload:action
    }
}

export function recipeDetail(id){
    return {
        type:RECIPE_DETAIL,
        payload: id
    }

}

export function itsCreatedData (action){
    return {
        type:ITS_CREATED_DATA,
        payload: action
    }
}