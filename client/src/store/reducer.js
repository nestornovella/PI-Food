import { dietsFiltred, itsCreated, orderData, searchRecipes } from "../functions/functions"
import { ORDER_ALL_DATA, FILTRED_BY_DIETS, GET_ALL_DIETS, GET_ALL_RECIPES, ITS_CREATED_DATA, MAX_PAGES, PAGE_CHANGE, RECIPE_DETAIL, REFRESH_API, SEARCH, filtredAllData } from "./actions"

const initialState = {
    allData: [],//copia
    filtredData: [],
    diets: [],
    recipeDetail: {},
    page: 0,
    maxPages: 0,
    search: "",
    dietsFilter: "",
    itsCreated: ""


}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RECIPES:

            return {
                ...state,
                allData: action.payload,
                filtredData: action.payload
            }

        case GET_ALL_DIETS: {
            return {
                ...state,
                diets: action.payload
            }
        }
        case REFRESH_API:
            return {
                ...state,
                allData: [],
                filtredData: []
            }

        case MAX_PAGES:
            return {
                ...state,
                maxPages: state.filtredData.length
            }

        case PAGE_CHANGE:
            var pageType = action.payload

            return {
                ...state,
                page: pageType === "last" ? state.page < 1 ? state.page : state.page - 1 : state.page > state.maxPages / 9 - 1 ? state.page : state.page + 1,

            }

        case ORDER_ALL_DATA:

            return {
                ...state,
                page: 0,
                filtredData: !action.payload ? [...state.allData] : orderData([...state.filtredData], action.payload)
            }

        case ITS_CREATED_DATA:
            return {
                ...state,
                page: 0,
                itsCreated: action.payload,
                filtredData: !state.search && !state.dietsFilter ?  // []
                itsCreated([...state.allData], action.payload)
                : state.search && !state.dietsFilter ?
                itsCreated(searchRecipes([...state.allData], state.search), action.payload)
                : !state.search && state.dietsFilter ?
                itsCreated(dietsFiltred([...state.allData],state.dietsFilter),action.payload) 
                :
                itsCreated(searchRecipes(dietsFiltred([...state.allData],state.dietsFilter), state.search), action.payload)
            }

        case FILTRED_BY_DIETS:

            return {
                ...state,
                page: 0,
                dietsFilter: action.payload,
                filtredData: !state.search && !state.itsCreated ?  // []
                dietsFiltred([...state.allData], action.payload)
                : state.search && !state.itsCreated ?
                dietsFiltred(searchRecipes([...state.allData], state.search), action.payload)
                : !state.search && state.itsCreated ?
                dietsFiltred(itsCreated([...state.allData],state.itsCreated),action.payload) 
                :
                dietsFiltred(searchRecipes(itsCreated([...state.allData],state.itsCreated), state.search), action.payload)
            }
        case SEARCH:
            return {
                ...state,
                page: 0,
                search: action.payload,
                filtredData: !state.dietsFilter && !state.itsCreated ?
                    searchRecipes([...state.allData], action.payload)
                    : !state.dietsFilter && state.itsCreated ?
                    searchRecipes(itsCreated([...state.allData], state.itsCreated), action.payload)
                    : state.dietsFilter && !state.itsCreated ? 
                    searchRecipes(dietsFiltred([...state.allData], state.dietsFilter), action.payload)
                    :
                    searchRecipes(dietsFiltred(itsCreated([...state.allData], state.itsCreated), state.dietsFilter), action.payload)
            }

        case RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: [...state.allData].filter(r => r.id == action.payload)[0]
            }

        default:
            return { ...state }
    }


}