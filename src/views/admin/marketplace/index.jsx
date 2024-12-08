import { Box, Flex, Grid, SimpleGrid } from '@chakra-ui/react';

import axios from 'axios';
import NFT from 'components/card/NFT';

import { useEffect, useState } from 'react';

export default function Marketplace() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const UID = process.env.REACT_APP_UID;

    axios
      .get(`${API_URL}users/${UID}`)
      .then((response) => {
        console.log('User data:', response.data);
        // Assuming the API response is a list of journeys
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching journeys data:', error);
      });
  }, []); // Empty dependency array ensures this runs once when the component loads

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      <Grid mb="20px" display={{ base: 'block' }}>
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
        >
          <SimpleGrid columns={{ base: 2, md: 3 }} gap="20px">
            {userData.journal?.journeys?.length > 0 ? (
              userData.journal.journeys.map((journey, index) => (
                <NFT
                  is_active={true}
                  key={index}
                  journey_id={journey.id}
                  name={journey.name_of_location}
                  location="Cluj-Napoca, Romania"
                  description={journey.description}
                  budget_breakdown={journey.budget_breakdown}
                  wellbeing_impact={journey.wellbeing_impact}
                  stars={null}
                  benefits={journey.tags}
                  link_to_maps={journey.maps_link}
                  how_felt={journey.how_felt}
                  //leave_review={journey.rating === null ? '1' : '0'}
                  leave_review="1"
                />
              ))
            ) : (
              <p>Loading journeys...</p>
            )}
          </SimpleGrid>
        </Flex>
      </Grid>
    </Box>
  );
}
