"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Stack,
  Textarea,
  Wrap,
} from "../../chakra.ui.provider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { findWinesWith, selectFoundWines } from "@/redux/features/wine.slice";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

type ComponentProps = {
  listComponent: React.ReactElement;
  placeholderDesc?: string;
};

const SearchWines = (props: ComponentProps) => {
  const { listComponent, placeholderDesc = "Enter description" } = props;
  const dispatch = useAppDispatch();
  const foundWines = useAppSelector(selectFoundWines);
  const [queryPage, setQueryPage] = useState<number>(1);
  const [desc, setDesc] = useState<string>("");

  // effect when page number changed
  useEffect(() => {
    dispatch(findWinesWith({ description: desc, page: queryPage }));
  }, [queryPage, dispatch]);

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const handleSearch = () => {
    setQueryPage(1);
    dispatch(findWinesWith({ description: desc }));
  };

  const handlePageChange = (page: number) => {
    setQueryPage(page);
  };

  return (
    <Flex direction="column" align="center" justifyContent="space-evenly">
      <Container m="4">
        <Wrap>
          <Textarea
            size="md"
            minH="sm"
            variant="filled"
            colorScheme="teal"
            placeholder={placeholderDesc}
            onChange={handleDescChange}
          />
        </Wrap>
      </Container>
      <Button
        colorScheme="green"
        m="4"
        onClick={handleSearch}
        isDisabled={foundWines.status == "fetching"}
      >
        Search
      </Button>
      <Stack m="4">
        {foundWines.status == "success" && listComponent !== null && (
          <listComponent.type data={foundWines.wineList} />
        )}
        {foundWines.status == "success" && foundWines.totalPage > 1 && (
          <ResponsivePagination
            current={queryPage}
            total={foundWines.totalPage}
            onPageChange={handlePageChange}
          />
        )}
      </Stack>
    </Flex>
  );
};

export default SearchWines;
