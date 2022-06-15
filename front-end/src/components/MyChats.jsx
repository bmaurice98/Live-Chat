import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender } from "../config/chatLogics";
import { ChatState } from "../context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModel from "./miscellaneous/GroupChatModel";

export const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const toast = useToast();

  const fetchChats = async () => {
    if (!chats) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      className={`${
        selectedChat ? "hidden" : "flex"
      } md:flex flex-col items-center p-3 bg-gray-700 w-full md:w-[31%] rounded-md border-2 border-slate-800`}
    >
      <Box className="flex w-full justify-between items-center px-3 pb-3 text-[28px] md:text-[30px] ">
        My Chats
        <GroupChatModel>
          <Button
            className="flex text-[17px] md:text-[10-px] lg:text-[17px]"
            rightIcon={<AddIcon />}
            color={"whatsapp.500"}
            variant="ghost"
          >
            New Group
          </Button>
        </GroupChatModel>
      </Box>

      <Box className="flex flex-col w-full h-[100%] rounded-lg overflow-hidden bg-gray-400 p-3">
        {chats ? (
          <Stack overflowY={"hidden"}>
            {chats?.map((chat) => (
              <Box
                className={`cursor-pointer px-3 py-2 rounded-md overflow-hidden`}
                bg={selectedChat === chat ? "whatsapp.500" : "#00000"}
                color={selectedChat === chat ? "gray.800" : "whatsapp.700"}
                _hover={{ bg: "white" }}
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
              >
                <Text className="font-bold font-serif">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};
