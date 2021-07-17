import {AnyAction} from 'redux';
import {HYDRATE} from 'next-redux-wrapper';
import {WineActionType} from '../actionTypes/wineTypes';

export type WineState = {
    numUniqueWine: number,
    numUniqueCountry: number,
    findingWine: boolean,
    totalPages: number,
    totalResults: number,
    wineList: [],
}

const initWineState: WineState = {
    numUniqueWine: 0,
    numUniqueCountry: 0,
    findingWine: false,
    totalPages: 0,
    totalResults: 0,
    wineList: [],
}

export const wineReducer = (state:WineState = initWineState, action:AnyAction)=>{
    switch(action.type){
        case HYDRATE:
            return state;
        case WineActionType.UPDATE_NUM_UNIQUE_WINE:
            return {
                ...state, 
                numUniqueWine: action.payload
            }
        case WineActionType.UPDATE_NUM_UNIQUE_COUNTRY:
            return {
                ...state, 
                numUniqueCountry: action.payload
            }
        case WineActionType.START_FINDING_WINE:
            return {
                ...state,
                findingWine: true,
            }
        case WineActionType.END_FINDING_WINE:
            return {
                ...state,
                findingWine: false,
            }
        case WineActionType.UPDATE_WINE_LIST:
            return {
                ...state,
                totalPages: action.payload.totalPages,
                totalResults: action.payload.totalResults,
                wineList: action.payload.wineList,
            }
        default:
            return state;
    }
}