import { createSelector } from "reselect";
import { WineState } from "../reducers/wineReducer";
import { RootState } from "../store";

const selectWine = (state: RootState) => state.wine;
const selectWineResults = (state: RootState) => {
  return {
    totalPages: state.wine.totalPages,
    totalResults: state.wine.totalResults,
    results: state.wine.wineList,
  };
};

const transformWineResult = (wineResult: any) => {
  if (!wineResult.results) return [];

  return {
    ...wineResult,
    results: wineResult.results.map((wine: any) => {
      return {
        country: wine["country"],
        title: wine["title"],
      };
    }),
  };
};

export const selectWineQueryResult = createSelector(
  selectWineResults,
  transformWineResult
);

export const selectFetchingNumUniqueWine = createSelector(
  selectWine,
  (wine: WineState) => wine.fetchingNumUniqueWine
);

export const selectNumUniqueWine = createSelector(
  selectWine,
  (wine: WineState) => wine.numUniqueWine
);

export const selectFetchingNumUniqueCountry = createSelector(
  selectWine,
  (wine: WineState) => wine.fetchingNumUniqueCountry
);

export const selectNumUniqueCountry = createSelector(
  selectWine,
  (wine: WineState) => wine.numUniqueCountry
);

export default {};
