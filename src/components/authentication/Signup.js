import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState("");

  const postDetails = (pics) => {};

  const submitHandler = () => {};

  return (
    <div>
      <VStack spacing={"5px"} color="black">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
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
                color={""}
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Confirm your Password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <InputRightElement className="w-[4.5rem]">
              <Button
                className="h-[1.75rem]"
                size={"sm"}
                color={""}
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="profile-pic">
          <FormLabel>Upload a Profile Picture</FormLabel>
          <Input
            type={"file"}
            p={1}
            accept="image/*"
            placeholder="Enter Your Email"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
        <Button
          colorScheme={"whatsapp"}
          className="w-full mt-[15px]"
          onClick={submitHandler}
        >
          Sign up
        </Button>
      </VStack>
    </div>
  );
};

export default Signup;
