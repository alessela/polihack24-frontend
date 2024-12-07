import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" width="130px"
        style={{marginBottom: '20px'}}
      />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
