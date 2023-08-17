import { ThunkDispatch, ThunkAction } from "redux-thunk";
import axios from "axios";
import { WineActionType } from "../actionTypes/wineTypes";
import { AnyAction, Action } from "redux";
// import { WineState } from "../reducers/wineReducer";
import { RootState } from "../store";

const API_ENDPOINT = process.env.NEXT_PUBLIC_WINE_FINDER_API;

/**
 * Dispatch redux-thunk action to fetch number of unique wine
 * in database.
 */
export const fetchNumUniqueWine =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch({
      type: WineActionType.FETCH_NUM_UNIQUE_WINE,
    });

    const res = await axios.get(`${API_ENDPOINT}/list-of/title`);
    const wineQuantity = res.data.total_results;

    dispatch({
      type: WineActionType.UPDATE_NUM_UNIQUE_WINE,
      payload: wineQuantity,
    });
  };

/**
 * Dispatch redux-thunk action to fetch number of unique country
 */
export const fetchNumUniqueCountry =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch({
      type: WineActionType.FETCH_NUM_UNIQUE_COUNTRY,
    });

    const res = await axios.get(`${API_ENDPOINT}/list-of/country`);
    const countryQuantity = res.data.total_results;

    dispatch({
      type: WineActionType.UPDATE_NUM_UNIQUE_COUNTRY,
      payload: countryQuantity,
    });
  };

/**
 * Dispatch redux-thunk action to find list of wines
 * that is similar to description
 *
 * @param description the description that is used to find wines
 */
export const findWineWith =
  (
    description: string = "",
    page: number = 1,
    size: number = 10
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: WineActionType.START_FINDING_WINE,
    });

    const res = await axios.post(`${API_ENDPOINT}/find-wine`, {
      description: description,
      query_page: page,
      query_size: size,
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
      },
    });

    dispatch({
      type: WineActionType.END_FINDING_WINE,
    });
  };
