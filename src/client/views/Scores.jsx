import React, { Fragment, useState, useEffect } from "react";
import { Box, Flex, Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

import ScoresLeftNav from "../components/ScoresLeftNav";
import ScoresContent from "../components/ScoresContent";
import NewScoreForm from "../components/NewScoreForm";

const Scores = () => {
  console.log('Scores Loaded')

  const [currentScoreId, setCurrentScoreId] = useState(null)
  const [userScores, setUserScores] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();

        const response = await fetch('http://localhost:3000/score/currentuser', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result.status === 'success') {
          setUserScores(result.data);
        } else {
          console.error('Failed to fetch scores:', result);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
      }
    };

    fetchData();
  }, [getAccessTokenSilently]);

  const handleScoreSelection = (id) => {
    if (id === currentScoreId) {
      console.log('Same Score Selected')
      return;
    }
    setCurrentScoreId(id);
  };

  return (
    <Flex maxW="80vw" mx="auto" p={4} bg={'red.100'} height="100%">
      {/* ScoresLeftNav */}
      <Box flex="1" maxW="30%" bg="gray.200" p={4} alignSelf={"start"} >
        <ScoresLeftNav userScores={userScores} onScoreSelect={handleScoreSelection} />
      </Box>

      {/* ScoresContent */}
      <Box flex="1" p={4}>
        {currentScoreId ? (
          <ScoresContent scoreId={currentScoreId} />
        ) : (
          <NewScoreForm />
        )}
      </Box>
    </Flex>
  );
};

export default Scores;