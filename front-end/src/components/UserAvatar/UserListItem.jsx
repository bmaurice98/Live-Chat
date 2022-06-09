import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../context/ChatProvider";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      className="flex w-full items-center text-gray-800 py-[2px] px-[3px] mb-[2px] rounded-md cursor-pointer"
      bg={"#E8E8E8"}
      _hover={{ background: "#38B2AC", color: "white" }}
    >
      <Avatar
        className="mx-2 cursor-pointer"
        name={user.name}
        src={user.image}
        size={"sm"}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize={"xs"}>
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
