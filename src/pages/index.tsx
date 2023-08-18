import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import wrapper, { RootState } from "../redux/store";
import {
  fetchNumUniqueWine,
  fetchNumUniqueCountry,
  findWineWith,
} from "../redux/actions/wineActions";
import {
  selectNumUniqueCountry,
  selectNumUniqueWine,
  selectWineQueryResult,
  selectFetchingNumUniqueWine,
  selectFetchingNumUniqueCountry,
} from "../redux/selectors/wineSelector";
import WineCollection from "../components/concrete/WineCollection/WineCollection";
import Counter from "../components/concrete/Counter/Counter";
import {
  Button,
  Flex,
  Textarea,
  Wrap,
  Text,
  Container,
  Stack,
  useTheme,
} from "@chakra-ui/react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import Head from "next/head";

type HomeProps = {
  header: string;
  example_desc: string;
  tooltip: string;
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  return {
    props: {
      header: "Wine Recommendation",
      tooltip: `The system analyze your description about the wine and then recommed similar wines for you.`,
      example_desc: `Describe how do you feel about the wine.\n\nExample:\n\nSharp, simple and candied, with blackberry jam and cola flavors. The tannins are rugged, and the wine finishes with a scour of acidity. Seems at its best now.`,
    },
  };
});

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const numUniqueWine = useAppSelector(selectNumUniqueWine);
  const fetchingUniqueWine = useAppSelector(selectFetchingNumUniqueWine);
  const numUniqueCountry = useAppSelector(selectNumUniqueCountry);
  const fetchingUniqueCountry = useAppSelector(selectFetchingNumUniqueCountry);
  const { findingWine } = useAppSelector((state: RootState) => state.wine);
  const wineQueryResult = useAppSelector(selectWineQueryResult);
  const [queryPage, setQueryPage] = useState<number>(1);
  const [desc, setDesc] = useState<string>("");

  // effect when component start
  useEffect(() => {
    dispatch(fetchNumUniqueWine());
    dispatch(fetchNumUniqueCountry());
  }, [dispatch]);

  // effect when page number changed
  useEffect(() => {
    dispatch(findWineWith(desc, queryPage));
  }, [queryPage, dispatch]);

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const handleSearch = () => {
    setQueryPage(1);
    dispatch(findWineWith(desc));
  };

  const handlePageChange = (page: number) => {
    setQueryPage(page);
  };

  return (
    <>
      <Head>
        <title>Find me wines</title>
      </Head>
      <Flex direction="column" align="center" justifyContent="space-evenly">
        <Text fontSize="4xl" fontWeight="bold">
          {props.header}
        </Text>
        <Wrap m="4">
          <Text fontSize="3xl">{`With`}</Text>
          {!fetchingUniqueWine && <Counter end={numUniqueWine} duration={4} />}
          <Text fontSize="3xl">{`wines`}</Text>
          <Text fontSize="3xl">{`From`}</Text>
          {!fetchingUniqueCountry && (
            <Counter end={numUniqueCountry} duration={4} />
          )}
          <Text fontSize="3xl">{`countries`}</Text>
        </Wrap>
        <Container m="4">
          <Wrap>
            <Textarea
              size="md"
              minH="sm"
              variant="filled"
              colorScheme="teal"
              placeholder={props.example_desc}
              onChange={handleDescChange}
            />
          </Wrap>
        </Container>
        <Button
          colorScheme="green"
          m="4"
          onClick={handleSearch}
          isDisabled={findingWine}
        >
          Search
        </Button>
        <Stack m="4">
          {wineQueryResult.results && (
            <WineCollection data={wineQueryResult.results} />
          )}
          {wineQueryResult.results && wineQueryResult.totalPages > 1 && (
            <ResponsivePagination
              current={queryPage}
              total={wineQueryResult.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default Home;
