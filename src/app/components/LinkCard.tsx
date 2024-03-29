'use client';
import React, { useState } from "react";
import { Box, Heading, Text } from '@chakra-ui/react';
import "../globals.css";

interface LinkCardProps {
  title: string;
  description: string;
  url: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ title, description, url }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      window.open(url, "_blank");
      setIsClicked(false);
    }, 500);
  };
  return (
      <Box
        borderRadius="1px"
        overflow="hidden"
        borderWidth={2}  // Use borderWidth instead of border
        borderColor="gray.300"  // Use borderColor without quotes
        my={4}
        p={4}
        textAlign="center"
        _hover={{ 
          bgGradient:'linear(to-l, purple.200,purple.100)',
          boxShadow: '0 0 20px 5px #787be0',
          "& h2": { color: "black" },
          rounded: "full"
        }}  
        rounded="full"  // Use rounded without quotes
        transition="all 0.3s"
        bgGradient='linear(to-l, blue.500,purple.500)'
        onClick={handleClick}
        cursor={isClicked ? "not-allowed" : "pointer"}
      >
        <Heading fontSize="lg" color="white">
          {title}
        </Heading>
      </Box>
  );
};

export default LinkCard;