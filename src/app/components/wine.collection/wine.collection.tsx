import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Wrap,
  Box,
  Image,
  Center,
  Square,
  Avatar,
  Container,
} from "@chakra-ui/react";

type WineData = {
  title: string;
  country: string;
  description: string;
  points: number;
  price: number;
};

export type WineCollectionProps = React.ComponentProps<typeof Wrap> & {
  data: [WineData];
};

const WineCollection: React.FC<WineCollectionProps> = (
  props: WineCollectionProps
) => {
  const { data } = props;
  return (
    <Container maxW={"container.lg"}>
      <Wrap direction="column">
        {data.map((wine, i) => {
          return (
            <Card
              key={`${wine.title}-${i}`}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="filled"
              colorScheme="teal"
              boxShadow="md"
            >
              <CardBody>
                <Stack direction="column">
                  <Wrap align="center">
                    <Image
                      src="/wine-bottle.png"
                      fit="cover"
                      boxSize="32px"
                      alt="wine-bottle"
                    />
                    <Heading size="md">{wine.title}</Heading>
                  </Wrap>
                  <Wrap align="center">
                    <Image src="/location.png" boxSize="32px" alt="location" />
                    <Text fontSize="md" fontWeight="bold">
                      {wine.country}
                    </Text>
                  </Wrap>
                  <Wrap align="center">
                    <Image src="/rating.png" boxSize="32px" alt="rating" />
                    <Text fontSize="md" fontWeight="bold">
                      {wine.points}
                    </Text>
                  </Wrap>
                  <Wrap align="center">
                    <Image src="/price.png" boxSize="32px" alt="price" />
                    <Text fontSize="md" fontWeight="bold">
                      {wine.price}
                    </Text>
                    <Text fontSize="md" fontWeight="bold">{` USD`}</Text>
                  </Wrap>
                  <Wrap direction="column">
                    <Image src="/comment.png" boxSize="32px" alt="comment" />
                    <Text fontSize="md" fontWeight="bold">
                      {wine.description}
                    </Text>
                  </Wrap>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </Wrap>
    </Container>
  );
};

export default WineCollection;
