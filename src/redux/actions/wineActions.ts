import {ThunkDispatch} from 'redux-thunk';
import axios from 'axios';
import {WineActionType} from '../actionTypes/wineTypes';
import { AnyAction } from 'redux';
import {WineState} from '../reducers/wineReducer';

const ML_API = process.env.NEXT_PUBLIC_ML_API;

/**
 * Dispatch redux-thunk action to fetch number of unique wine
 * in database. 
 */
export const fetchNumUniqueWine = () => async (
    dispatch:ThunkDispatch<WineState, void, AnyAction>
    )=>{
        dispatch({
            type: WineActionType.FETCH_NUM_UNIQUE_WINE,
        })

        const res = await axios.get(`${ML_API}/list-of/title`);
        const wineQuantity = res.data.total_results;

        dispatch({
            type: WineActionType.UPDATE_NUM_UNIQUE_WINE,
            payload: wineQuantity,
        })
} 

/**
 * Dispatch redux-thunk action to fetch number of unique country
 */
export const fetchNumUniqueCountry = () => async (
    dispatch:ThunkDispatch<WineState, void, AnyAction>
    )=>{
        dispatch({
            type: WineActionType.FETCH_NUM_UNIQUE_COUNTRY
        })
        
        const res = await axios.get(`${ML_API}/list-of/country`);
        const countryQuantity = res.data.total_results;

        dispatch({
            type: WineActionType.UPDATE_NUM_UNIQUE_COUNTRY,
            payload: countryQuantity,
        });
}

/**
 * Dispatch redux-thunk action to find list of wines
 * that is similar to description 
 * 
 * @param description the description that is used to find wines
 */
export const findWineWith = (description:string='') => async (
    dispatch:ThunkDispatch<WineState, void, AnyAction>
    )=>{

        dispatch({
            type:WineActionType.START_FINDING_WINE,
        });

        const res = await axios.post(`${ML_API}/find-wine`,{
            description: description
        });
        const wineList = res.data.result;
        const totalPages = res.data.total_pages;
        const totalResults = res.data.total_results;

        dispatch({
            type: WineActionType.UPDATE_WINE_LIST,
            payload: {
                wineList,
                totalPages,
                totalResults,
            }
        })

        dispatch({
            type: WineActionType.END_FINDING_WINE,
        })



}