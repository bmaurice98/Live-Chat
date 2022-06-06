import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = () => {};

  return (
    <div>
      <VStack spacing={"5px"} color="black">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter a Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement className="w-[4.5rem]">
              <Button
                className="h-[1.75rem]"
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
        >
          Sign In
        </Button>
        <Button
          variant={"solid"}
          colorScheme={"green"}
          mt="15px"
          className="w-full "
          onClick={() => {
            setEmail("guest@example.com");
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
