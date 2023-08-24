"use client";

import { Wrap, Text } from "@/app/chakra.ui.provider";
import {
  fetchNumUniqueCountries,
  fetchNumUniqueWines,
  selectNumUniqueCountries,
  selectNumUniqueWines,
} from "@/redux/features/wine.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import Counter from "../counter/counter";

const WineAndCountry = () => {
  const dispatch = useAppDispatch();
  const numUniqueWines = useAppSelector(selectNumUniqueWines);
  const numUniqueCountries = useAppSelector(selectNumUniqueCountries);

  useEffect(() => {
    if (numUniqueWines.status == "idle") {
      dispatch(fetchNumUniqueWines());
    }

    if (numUniqueCountries.status == "idle") {
      dispatch(fetchNumUniqueCountries());
    }
  }, [dispatch]);

  return (
    <Wrap m="4">
      <Text fontSize="3xl">{`With`}</Text>
      {numUniqueWines.status == "success" && (
        <Counter end={numUniqueWines.value} duration={4} />
      )}
      <Text fontSize="3xl">{`wines`}</Text>
      <Text fontSize="3xl">{`From`}</Text>
      {numUniqueCountries.status == "success" && (
        <Counter end={numUniqueCountries.value} duration={4} />
      )}
      <Text fontSize="3xl">{`countries`}</Text>
    </Wrap>
  );
};

export default WineAndCountry;
