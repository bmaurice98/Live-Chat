import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const Signup = ({ props }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordAlert, setpasswordAlert] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Live-Chat");
      data.append("cloud_name", "mizu");
      fetch("https://api.cloudinary.com/v1_1/mizu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      console.log("final");
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
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
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Successful",
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
    }
  };

  const handleChange = (event) => {
    console.log(password);
    if (!event.target.value) return;
    console.log("====>", event.target.value);

    if (event.target.value === password.toString()) {
      setpasswordAlert(false);
    } else {
      setpasswordAlert(true);
    }
  };

  const debouncedChange = useMemo(() => debounce(handleChange, 1000), [props]);

  return (
    <div>
      <VStack spacing={"5px"} color="black">
        <FormControl id="first-name" paddingY={1} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="emailSignup" paddingY={1} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="passwordSignup" paddingY={1} isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter a Password"
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
        <FormControl id="confirm-password" paddingY={1} isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup className="flex flex-col">
            <Input
              type="password"
              placeholder="Confirm your Password"
              onChange={debouncedChange}
            />
            {passwordAlert ? (
              <Text color={"red"}>Passwords do not match</Text>
            ) : null}
            <InputRightElement className="w-[4.5rem]"></InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="profile-pic" paddingY={1}>
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
          isLoading={loading}
        >
          Sign up
        </Button>
      </VStack>
    </div>
  );
};

export default Signup;
