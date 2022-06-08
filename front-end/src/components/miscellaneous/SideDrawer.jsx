import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { ProfileModal } from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";

export const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user } = ChatState();

  const navigate = useNavigate();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Error Occured!",
        description: "Please enter something in the field",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}, ${config}`);
      console.log(data);

      setLoading(false);
      setResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box className="w-full flex justify-between items-center bg-gray-700 py-[5px] px-[10px] border-4 border-t-0 border-gray-800 rounded-b-md">
        <Tooltip label="Search Users to chat" hasArrow placement="bottom">
          <Button variant={"ghost"} color={"whatsapp.300"} onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text className="hidden md:flex p-1 ">User Search</Text>
          </Button>
        </Tooltip>
        <Text className="text-2xl">Live Chat</Text>
        <div>
          <Menu>
            <MenuButton className="p-1">
              <BellIcon className="text-2xl m-1" />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant={"ghost"}
              color={"whatsapp.300"}
              className="p-1"
            >
              <Avatar
                size={"sm"}
                className="cursor-pointer"
                name={user.name}
                src={user.image}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem color={"whatsapp.500"} placeContent={"center"}>
                  My Profile
                </MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem
                color={"whatsapp.500"}
                placeContent={"center"}
                onClick={logoutHandler}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Users</DrawerHeader>
          <DrawerBody>
            <Box className="flex p-[2px]">
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? <ChatLoading /> : <span>results</span>}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
