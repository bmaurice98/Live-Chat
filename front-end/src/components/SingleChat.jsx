import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/ChatProvider";
import { getSender, getSenderFull } from "../config/chatLogics";
import { ProfileModal } from "./miscellaneous/ProfileModal";
import { UpdateGroupChatModel } from "./miscellaneous/UpdateGroupChatModel";

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {selectedChat ? (
        <>
          <Text className="flex w-full text-[28px] md:text-[30px] pb-3 px-1 justify-between items-center">
            <IconButton
              className="flex md:hidden"
              color={"whatsapp.500"}
              variant="ghost"
              size={5}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                <Box className="text-[28px] md:text-[30px] pb-3 px-1">
                  {getSender(user, selectedChat.users)}
                </Box>
                <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                  color={"whatsapp.500"}
                  variant="ghost"
                />
                {console.log(selectedChat)}
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
                {console.log(selectedChat)}
              </>
            )}
          </Text>
          <Box className="flex flex-col w-full h-[100%] justify-end p-2 bg-gray-400 rounded-md overflow-y-hidden"></Box>
        </>
      ) : (
        <Box className="flex items-center justify-center h-[100%]">
          <Text className="text-3xl pb-3 font-serif">
            Select a user to begin chatting
          </Text>
        </Box>
      )}
    </>
  );
};
