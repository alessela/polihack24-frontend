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
        display={{ base: "block" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap='20px'>
              <NFT
                name='Test 1'
                location='Baciu, Cluj-Napoca'
                image={Nft1}
                stars='0'
                benefits={[
                  "Mindfullness",
                  "Relaxing",
                  "Nature",
                ]}
                leave_review="1"
              />
            </SimpleGrid>
        </Flex>
      </Grid>
    </Box>
  );
}
