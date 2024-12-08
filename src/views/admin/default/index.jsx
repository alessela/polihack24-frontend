/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import NFT from 'components/card/NFT';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Switch,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function UserReports() {
  // Chakra Color Mode
  const textColor = useColorModeValue('navy.700', 'white');
  const [budgetValues, setBudgetValues] = React.useState([120, 240]);

  const activityTypes = ['outdoor', 'hiking', 'volunteering', 'music', 'cultural', 'art', 'sports', 'food', 'shopping', 'relaxing', 'adventure', 'sightseeing', 'nightlife', 'wellness', 'learning', 'social', 'family', 'pets', 'water', 'mountain', 'forest', 'city', 'beach', 'desert', 'island', 'lake', 'river', 'park', 'garden', 'cave', 'castle', 'museum', 'theater', 'cinema', 'concert', 'festival', 'exhibition', 'workshop', 'class', 'game'];
  const [selectedActivityTypes, setActivityTypes] = React.useState(['volunteering'])

  const levels = ['high', 'moderate', 'low'];
  const [selectedLevels, setSelectedLevels] = React.useState('high');

  const [isGroup, setGroup] = React.useState(false);
  const [noGroupMembers, setNoGroupMembers] = React.useState(0);

  const [hours, setHours] = useState(0); // Track hours
  const [days, setDays] = useState(0); // Track days

  const [additionalInfo, setAdditionalInfo] = useState('');

  const [generatedJourneys, setGeneratedJourneys] = useState([]);

  const handleSubmit = async () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;

    const data = {
      activity_type: selectedActivityTypes.join(','),
      budget: `${budgetValues[0]}-${budgetValues[1]}`,
      group_size: isGroup ? noGroupMembers : '1',
      duration:
        '' + hours != 0
          ? `${hours} hours`
          : '' + days != 0
          ? `${days} days`
          : '',
      level_of_physical_activity: selectedLevels,
      additional_information: additionalInfo,
      location: 'Cluj-Napoca',
    };
    console.log('Data:', data);
    try {
      const response = await axios.post(`${API_URL}journeys/generate/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
      setGeneratedJourneys(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        h='100%'
        alignItems='start'
        justifyContent='center'
        bg="white"
        p="50"
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='20px' mb='25px'>
            New activity
          </Heading>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%"}}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="10px"
            >
              Activity type
            </FormLabel>
            <Flex
              align='center'
              me='20px'
              ms={{ base: "24px", md: "0px" }}
              gap={2}
              flexWrap={{ base: "wrap" }}
              mt={{ base: "20px", md: "0px" }}>
                {
                  activityTypes.map (activityType => (
                    <Button
                      key={activityType}
                      variant={selectedActivityTypes.includes(activityType) ? '#3E9D79' : '#E6FEF5'}
                      bg={selectedActivityTypes.includes(activityType) ? '#3E9D79' : '#E6FEF5'}
                      color={selectedActivityTypes.includes(activityType) ? 'white' : 'black'}
                      onClick={
                        () => 
                          setActivityTypes(selectedActivityTypes.includes(activityType) ?
                                              selectedActivityTypes.filter(actType => actType != activityType) :
                                              selectedActivityTypes.concat([activityType]))
                      }
                      fontSize='sm'
                      fontWeight='500'
                      borderRadius='70px'
                      px='24px'
                      py='5px'>
                        {activityType}
                    </Button>
                  ))
                }
            </Flex>

            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              mt="25px"
              maxW="420px"
              mb="10px"
              color={textColor}
              display="flex"
            >
              Budget
            </FormLabel>
            <RangeSlider defaultValue={[120, 240]} min={0} max={300} step={30} maxW="420px"
              onChange={setBudgetValues}>
              <RangeSliderTrack bg='red.100'>
                <RangeSliderFilledTrack bg='#3E9D79' />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={9} index={0} bg="#E6FEF5" >
                {budgetValues[0]}
              </RangeSliderThumb>
              <RangeSliderThumb boxSize={9} index={1} bg="#E6FEF5">
                {budgetValues[1]}
              </RangeSliderThumb>
            </RangeSlider>

            <FormLabel
              mt="15px"
              mb="10px"
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display="flex"
            >
              Group
            </FormLabel>
            <Flex
              align='center'
              gap={5}>
              <Switch 
                isChecked={isGroup} 
                onChange={(event) => {
                  let newValue = event.target.checked;
                  setGroup(newValue);
                  setNoGroupMembers(newValue ? 1 : 0);
                }}
                size="lg"
                colorScheme="teal"
              />
              <FormLabel
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                m="0"
                display='flex'>
                How many?
              </FormLabel>
              <NumberInput
                value={noGroupMembers}
                onChange={(_, newValue) => setNoGroupMembers(newValue)}
                min={1}
                width="100px"
                isDisabled={!isGroup}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <FormLabel
              mt="15px"
              mb="10px"
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display="flex"
            >
              Duration
            </FormLabel>
            <Flex
              align='center'
              gap={3}
              >
              <div>
                <FormLabel
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  display="flex"
                >
                  Hours
                </FormLabel>
                <NumberInput defaultValue={0} min={0} value={hours}
                  onChange={(_, valueAsNumber) => setHours(valueAsNumber)}>
                  <NumberInputField maxW="100px" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              <div>
                <FormLabel
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  display="flex"
                >
                  Days
                </FormLabel>
                <NumberInput defaultValue={0} min={0} value={days}
                  onChange={(_, valueAsNumber) => setDays(valueAsNumber)}>
                  <NumberInputField maxW="100px" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </div>
            </Flex>

            <FormLabel
              display='flex'
              mt="15px"
              mb="10px"
              fontSize='sm'
              fontWeight='500'
              color={textColor}>
              Level of physical activity
            </FormLabel>
            <Flex
              align='center'
              gap={2}
              >
                
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevels === level ? 'brand' : 'white'}
                  bg={selectedLevels === level ? '#3E9D79' : '#E6FEF5'}
                  color={selectedLevels === level ? 'white' : 'black'}
                  onClick={() => setSelectedLevels(level)}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="70px"
                  px="24px"
                  py="5px"
                >
                  {level}
                </Button>
              ))}
            </Flex>

            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              display='flex'
              mt="15px"
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='10px'>
              Additional info
            </FormLabel>
            <Textarea
              value={additionalInfo} // Bind state to the Textarea
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />

            <Button
              fontSize='sm'
              mt="25px"
              onClick={handleSubmit}
              variant='brand'
              fontWeight='500'
              w='auto'
              h='50'
              mb='24px'>
              Find me activities
            </Button>
          </FormControl>
        </Flex>
      </Flex>
      {generatedJourneys.length > 0 ? (
        generatedJourneys.map((journey, index) => (
          <NFT
            is_active={false}
            key={index}
            name={journey.name_of_location}
            location="Cluj-Napoca, Romania"
            description={journey.description}
            budget_breakdown={journey.budget_breakdown}
            wellbeing_impact={journey.wellbeing_impact}
            benefits={journey.tags}
            link_to_maps={journey.maps_link}
            leave_review="0"
          />
        ))
      ) : (
        <></>
      )}
    </Box>
  );
}
