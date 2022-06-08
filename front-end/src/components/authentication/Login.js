import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      console.log(data);
      toast({
        title: "Login Succeful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <VStack spacing={"5px"} color="black">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement className="w-[4.5rem]">
              <Button
                className="h-[1.75rem] mr-4"
                size={"sm"}
                bg={""}
                _hover={{ bg: "" }}
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme={"whatsapp"}
          mt="15px"
          className="w-full "
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign In
        </Button>
        <Button
          variant={"solid"}
          colorScheme={"green"}
          mt="15px"
          className="w-full "
          onClick={() => {
            setEmail("mizu@example.com");
            setPassword("password");
          }}
        >
          Login as Guest
        </Button>
      </VStack>
    </div>
  );
};

export default Login;
