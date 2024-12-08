// Chakra imports
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { IoStar, IoStarOutline } from 'react-icons/io5';
// Custom components
import Card from 'components/card/Card.js';
// Assets
import { useState } from 'react';
import { IoArrowRedoSharp } from 'react-icons/io5';

import axios from 'axios';

export default function NFT(props) {
  const {
    is_active,
    description,
    name,
    location,
    benefits,
    leave_review: initialLeaveReview = '1',
    budget_breakdown,
    wellbeing_impact,
    stars: initialStars = 0,
    how_felt: initialHowFelt = "",
    link_to_maps,
    journey_id,
  } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorBid = useColorModeValue('brand.500', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReviewOpen,
    onOpen: onReviewOpen,
    onClose: onReviewClose,
  } = useDisclosure();

  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState(initialStars);
  const [how_felt, setHowFelt] = useState(initialHowFelt);
  const [leave_review, setLeaveReview] = useState(initialLeaveReview);
  const [reviewText, setReviewText] = useState('');
  const toast = useToast();

  const handleRating = (rate) => {
    setRating(rate);
  };



  const handleHowFelt = (text) => {
    setReviewText(text);
  }

  const handleSubmit = async () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const data = { rating: rating, how_felt: reviewText }; // Prepare the data to send

    try {
      const response = await axios.patch(
        `${API_URL}journeys/${journey_id}/update`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        console.log('Review submitted successfully');
      setStars(rating);
      setHowFelt(reviewText);
      setLeaveReview('0');
        onReviewClose(); // Close the modal on success
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
    onReviewClose();
  };
  
  const handleJoinActivity = async () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    const JID = process.env.REACT_APP_JID;
    const data = { name_of_location: name, budget_breakdown: budget_breakdown, description: description, wellbeing_impact: wellbeing_impact, tags: benefits, maps_link: link_to_maps, journal: JID}; // Prepare the data to send


    try {
      const response = await axios.post(
        `${API_URL}journeys/save/`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        console.log('Review submitted successfully');
        onReviewClose(); // Close the modal on success
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
    onReviewClose();

    onClose();

    // Show the toast
    toast({
      title: "You joined the activity successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
      fontWeight: "500",
    });
  };

  return (
    <>
      <Card p="20px">
        <Flex direction={{ base: 'column' }} justify="center">
          {/* <Box mb={{ base: '10px', '2xl': '10px' }} position="relative">
            <Image
              src={image}
              w={{ base: '100%', '3xl': '100%' }}
              h={{ base: '100%', '3xl': '100%' }}
              borderRadius="10px"
            />
          </Box> */}
          <Flex flexDirection="row" justify="start" align="center" mb="10px">
            {benefits.map((benefit, key) => (
              <Flex
                key={key}
                bg="#E6FEF5"
                color="#3E9D79"
                borderRadius="50px"
                px="10px"
                py="5px"
                me="10px"
                fontSize="12px"
                fontWeight="500"
                textTransform={'capitalize'}
              >
                {benefit}
              </Flex>
            ))}
          </Flex>
          <Flex flexDirection="column" justify="space-between" h="100%">
            <Flex
              justify="space-between"
              direction={{
                base: 'row',
                md: 'column',
                lg: 'row',
                xl: 'column',
                '2xl': 'row',
              }}
              mb="auto"
            >
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize={{
                    base: 'xl',
                    md: 'lg',
                    lg: 'lg',
                    xl: 'lg',
                    '2xl': 'md',
                    '3xl': 'lg',
                  }}
                  mb="5px"
                  fontWeight="bold"
                  me="14px"
                >
                  {name}
                </Text>
                <Text
                  color="secondaryGray.600"
                  fontSize={{
                    base: 'sm',
                  }}
                  fontWeight="400"
                  me="14px"
                >
                  {location}
                </Text>
              </Flex>
            </Flex>
            <Flex
              align="center"
              justify="space-between"
              direction={{
                base: 'row',
                md: 'column',
                lg: 'row',
                xl: 'column',
                '2xl': 'row',
              }}
              mt="15px"
            >
              {stars !== null && (
                <Flex align="center" gap={1}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      as={star <= stars ? IoStar : IoStarOutline}
                      color={star <= stars ? '#3E9D79' : 'gray.300'}
                      boxSize={5}
                    />
                  ))}
                </Flex>
              )}
              <Link
                ms="auto"
                mt={{
                  base: '0px',
                  md: '10px',
                  lg: '0px',
                  xl: '10px',
                  '2xl': '0px',
                }}
              >
                <Button
                  variant="darkBrand"
                  bg="#3E9D79"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="70px"
                  px="24px"
                  onClick={onOpen}
                  py="5px"
                >
                  {is_active === false ? "Explore" : "See details"}
                </Button>
              </Link>
            </Flex>
            {leave_review === '1' && (
              <Flex mt="15px" align="center" direction="column">
                <Divider width="100%" />
                <Button
                  width="100%"
                  variant="solid"
                  bg="transparent"
                  color="#3E9D79"
                  _hover={{ bg: 'transparent' }}
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="70px"
                  border={`1px solid #3E9D79`}
                  px="24px"
                  py="5px"
                  mt="15px"
                  onClick={onReviewOpen}
                >
                  Leave a review
                </Button>
                <Text mt="10px" fontSize="sm" color="secondaryGray.600">
                  Help others choose better.
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="70vw" height="auto">
          <ModalHeader>Explore</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box>
                {/* <Box mb={{ base: '10px', '2xl': '10px' }} position="relative">
                  <Image
                    src={image}
                    w="100%"
                    height="300px"
                    objectFit={'cover'}
                    borderRadius="10px"
                    mb="40px"
                  />
                </Box> */}
                <Text
                  color={textColor}
                  fontSize="24px"
                  mb="5px"
                  fontWeight="bold"
                  me="14px"
                >
                  {name}
                </Text>
                <Flex align="center">
                  <Link
                    color="#3E9D79"
                    fontSize={{
                      base: 'sm',
                    }}
                    fontWeight="medium"
                    me="5px"
                  >
                    {location}
                  </Link>
                  <Link href={link_to_maps} isExternal mt="1">
                    <Icon as={IoArrowRedoSharp} color="#3E9D79" />
                  </Link>
                </Flex>
                <Text
                  color={textColor}
                  fontSize="18px"
                  mt="15px"
                  fontWeight="medium"
                  me="14px"
                >
                  Description
                </Text>
                <Text
                  color="secondaryGray.600"
                  fontSize="14px"
                  fontWeight="400"
                  me="14px"
                >
                  {description}
                </Text>
                <Text
                  color={textColor}
                  fontSize="18px"
                  mt="15px"
                  fontWeight="medium"
                  me="14px"
                >
                  Budget
                </Text>
                <Text
                  color="secondaryGray.600"
                  fontSize="14px"
                  fontWeight="400"
                  me="14px"
                >
                  {budget_breakdown}
                </Text>
              </Box>
              <Box>
                <Text
                  color={textColor}
                  fontSize="18px"
                  mb="5px"
                  fontWeight="medium"
                  me="14px"
                >
                  Tags
                </Text>
                <Flex
                  flexDirection="row"
                  justify="start"
                  align="center"
                  mt="10px"
                  mb="20px"
                >
                  {benefits.map((benefit, key) => (
                    <Flex
                      key={key}
                      bg="#E6FEF5"
                      color="#3E9D79"
                      borderRadius="50px"
                      px="16px"
                      py="8px"
                      me="10px"
                      fontSize="14px"
                      fontWeight="500"
                    >
                      {benefit}
                    </Flex>
                  ))}
                </Flex>
                {is_active === true ? ( <Box>
                <Text
                  color={textColor}
                  fontSize="18px"
                  mt="15px"
                  mb="10px"
                  fontWeight="medium"
                >
                  How was it?
                </Text>
                {stars === null ? (
                  <Link
                    color="#3E9D79"
                    fontSize="sm"
                    fontWeight="medium"
                    onClick={onReviewOpen}
                  >
                    Leave a review
                  </Link>
                ) : (
                  <Box>
                    <Flex align="center" mb="20px">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          as={star <= stars ? IoStar : IoStarOutline}
                          color={star <= stars ? '#3E9D79' : 'gray.300'}
                          boxSize={8}
                        />
                      ))}
                    </Flex>
                    <Text
                      color="secondaryGray.600"
                      fontSize="14px"
                      fontWeight="400"
                    >
                      {how_felt}
                    </Text>
                  </Box>
                )}
                </Box> ) : (
                  <></>
                )}
                  <Box
                  bg="#F4FFFB"
                  px="5"
                  py="5"
                  border="2px solid #E6FEF5"
                  borderRadius={8}
                  mt="15px"
                >
                  <Text color="#3E9D79" fontSize="18px" fontWeight="medium">
                    Wellbeing Benefits
                  </Text>
                  <Text color="black" fontSize="14px" fontWeight="400" mt="8px">
                    {wellbeing_impact}
                  </Text>
                </Box>
              </Box>
            </Grid>
            {is_active === false ? (
              <Button
                variant="darkBrand"
                borderRadius="100px"
                bg="#3E9D79"
                mt="25px"
                onClick={handleJoinActivity}
              >
                Join this activity
              </Button>
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isReviewOpen} onClose={onReviewClose} size="xl">
        <ModalOverlay />
        <ModalContent width="80vw" height="auto">
          <ModalHeader>Leave a Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Rating*</FormLabel>
            <Flex mb={4} gap={3}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  as={star <= rating ? IoStar : IoStarOutline}
                  color={star <= rating ? '#3E9D79' : 'gray.300'}
                  boxSize={8}
                  cursor="pointer"
                  onClick={() => handleRating(star)}
                />
              ))}
            </Flex>
            <FormControl mt={4}>
              <FormLabel>How did you feel?</FormLabel>
              <Textarea
                placeholder="Express in a few words..."
                focusBorderColor="#3E9D79"
                rows={5}
                value={reviewText} // Bind state to the Textarea
                onChange={(e) => handleHowFelt(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={handleSubmit}
              variant="darkBrand"
              borderRadius="100px"
              bg="#3E9D79"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
