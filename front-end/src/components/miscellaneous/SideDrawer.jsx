import {
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { ProfileModal } from "./ProfileModal";

export const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user } = ChatState();

  return (
    <Box className="w-full flex justify-between items-center bg-gray-700 py-[5px] px-[10px] border-4 border-t-0 border-gray-800 rounded-b-md">
      <Tooltip label="Search Users to chat" hasArrow placement="bottom">
        <Button variant={"ghost"} color={"whatsapp.300"}>
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
            <MenuItem color={"whatsapp.500"} placeContent={"center"}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
};

export default SideDrawer;
