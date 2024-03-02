'use client';
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface LinkCardProps {
  title: string;
  description: string;
  url: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ title, description, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Box
        borderRadius="1px"
        overflow="hidden"
        borderWidth={2}  // Use borderWidth instead of border
        borderColor="gray.300"  // Use borderColor without quotes
        my={4}
        p={4}
        textAlign="center"
        _hover={{ bg: 'gray.300' }}
        rounded="full"  // Use rounded without quotes
        transition="all 0.3s"
        bg="rgba(240, 240, 240, 0.3)"
      >
        <Heading fontSize="xl" color="blue.900">
          {title}
        </Heading>
        <Text color="gray.600">{description}</Text>
      </Box>
    </a>
  );
};

export default LinkCard;