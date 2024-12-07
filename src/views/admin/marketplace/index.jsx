import React from "react";

import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

import NFT from "components/card/NFT";
import Nft1 from "assets/img/nfts/Nft1.png";

export default function Marketplace() {
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              <NFT
                name='Test 1'
                location='Baciu, Cluj-Napoca'
                image={Nft1}
                stars='4'
                reviews='17'
                benefits={[
                  "Mindfullness",
                  "Relaxing",
                  "Nature",
                ]}
              />
            </SimpleGrid>
        </Flex>
      </Grid>
    </Box>
  );
}
