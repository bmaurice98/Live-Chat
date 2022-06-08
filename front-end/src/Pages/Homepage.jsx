import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Login, Signup } from "../components/authentication";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW={"xl"} centerContent>
      <Box className="flex justify-center p-2 bg-white w-[100%] mt-10 mb-4 border-2 rounded-lg">
        <Text className="text-4xl font-serif">Live Chat</Text>
      </Box>
      <Box className="bg-white w-full p-4 rounded-lg border-2">
        <Tabs isFitted variant="enclosed" colorScheme={"whatsapp"}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
