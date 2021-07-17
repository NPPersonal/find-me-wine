import {createSelector} from 'reselect';
import { WineState } from '../reducers/wineReducer';
import { RootState } from '../store';

const selectWine = (state:RootState)=>state.wine;
const selectWineList = (state:RootState)=>state.wine.wineList;

const transformWineList = (wineList:any)=>{
    if(!wineList) return [];

    return wineList.map((wine:any)=>{
        return {
            country: wine['country'],
            title: wine['title']
        }
    })
}

export const selectTransformWineList = createSelector(
    selectWineList,
    transformWineList,
);

export const selectNumUniqueWine = createSelector(
    selectWine,
    (wine:WineState)=>wine.numUniqueWine
)

export const selectNumUniqueCountry = createSelector(
    selectWine,
    (wine:WineState)=>wine.numUniqueCountry
)

export default {};