import { Flex, Text } from "./chakra.ui.provider";
import SearchWines from "./components/search.wines/search.wines";
import WineAndCountry from "./components/wine.and.country/wine.and.country";
import WineCollection from "./components/wine.collection/wine.collection";

const getProps = () => ({
  header: "Wine Recommendation",
  tooltip: `The system analyze your description about the wine and then recommed similar wines for you.`,
  example_desc: `Describe how do you feel about the wine.\n\nExample:\n\nSharp, simple and candied, with blackberry jam and cola flavors. The tannins are rugged, and the wine finishes with a scour of acidity. Seems at its best now.`,
});

const Page = () => {
  const props = getProps();
  return (
    <Flex direction="column" align="center" justifyContent="space-evenly">
      <Text fontSize="4xl" fontWeight="bold">
        Find me wine
      </Text>
      <WineAndCountry />
      <SearchWines
        listComponent={<WineCollection />}
        placeholderDesc={props.example_desc}
      />
    </Flex>
  );
};

export default Page;
