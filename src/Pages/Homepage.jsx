import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box className="flex justify-center p-2 bg-white w-[100%] mt-10 ml-4 border-2 rounded-lg">
        <Text className="text-4xl">Live Chat</Text>
      </Box>
      <Box className="bg-white w-full p-4 rounded-lg border-2"></Box>
    </Container>
  );
};

export default Homepage;
