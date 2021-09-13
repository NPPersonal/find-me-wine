import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { WineActionType } from "../actionTypes/wineTypes";

export type WineState = {
  numUniqueWine: number;
  fetchingNumUniqueWine: boolean;
  numUniqueCountry: number;
  fetchingNumUniqueCountry: boolean;
  findingWine: boolean;
  totalPages: number;
  totalResults: number;
  wineList: [];
};

const initWineState: WineState = {
  numUniqueWine: 0,
  fetchingNumUniqueWine: false,
  numUniqueCountry: 0,
  fetchingNumUniqueCountry: false,
  findingWine: false,
  totalPages: 0,
  totalResults: 0,
  wineList: [],
};

export const wineReducer = (
  state: WineState = initWineState,
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case WineActionType.FETCH_NUM_UNIQUE_WINE:
      return {
        ...state,
        fetchingNumUniqueWine: true,
      };
    case WineActionType.UPDATE_NUM_UNIQUE_WINE:
      return {
        ...state,
        numUniqueWine: action.payload,
        fetchingNumUniqueWine: false,
      };
    case WineActionType.FETCH_NUM_UNIQUE_COUNTRY:
      return {
        ...state,
        fetchingNumUniqueCountry: true,
      };
    case WineActionType.UPDATE_NUM_UNIQUE_COUNTRY:
      return {
        ...state,
        numUniqueCountry: action.payload,
        fetchingNumUniqueCountry: false,
      };
    case WineActionType.START_FINDING_WINE:
      return {
        ...state,
        totalPages: 0,
        totalResults: 0,
        wineList: [],
        findingWine: true,
      };
    case WineActionType.END_FINDING_WINE:
      return {
        ...state,
        findingWine: false,
      };
    case WineActionType.UPDATE_WINE_LIST:
      return {
        ...state,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
        wineList: action.payload.wineList,
      };
    default:
      return state;
  }
};
