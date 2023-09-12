import React, { Fragment, useState, useEffect } from "react";
import { Box, Flex } from '@chakra-ui/react';

import ScoresLeftNav from "../components/ScoresLeftNav";
import ScoresContent from "../components/ScoresContent";

const Scores = () => {
  console.log('Scores Loaded')
  return (
    <Flex w="80vw" mx="auto" p={4} maxHeight="100%" overflowY="auto">
      {/* ScoresLeftNav */}
      <Box w="100px" bg="gray.200" p={4} mr={4}>
        <ScoresLeftNav />
      </Box>

      {/* ScoresContent */}
      <Box flex="1" bg="gray.300" p={4}>
        <ScoresContent />
      </Box>
    </Flex>
  );
};

// NEW VERSION
export default Scores;
