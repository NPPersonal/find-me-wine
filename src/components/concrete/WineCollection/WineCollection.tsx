import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Wrap,
  Box,
} from "@chakra-ui/react";

type WineData = {
  title: string;
  country: string;
};

export type WineCollectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: [WineData];
};

const WineCollection: React.FC<WineCollectionProps> = (
  props: WineCollectionProps
) => {
  const { data } = props;

  return (
    <Wrap direction="column">
      {data.map((wine, i) => {
        return (
          <Box boxShadow="md">
            <Card
              key={`${wine.title}-${i}`}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="filled"
              colorScheme="teal"
            >
              <Stack>
                <CardBody>
                  <Heading size="md">{wine.country}</Heading>
                  <Text>{wine.title}</Text>
                </CardBody>
              </Stack>
            </Card>
          </Box>
        );
      })}
    </Wrap>
  );
};

export default WineCollection;
