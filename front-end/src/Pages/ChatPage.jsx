import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import { SideDrawer } from "../components/miscellaneous/SideDrawer";
import { MyChats } from "../components/MyChats";
import { ChatBox } from "../components/ChatBox";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div className="w-full text-white font-serif">
      {user && <SideDrawer />}
      <Box className="flex justify-between w-full h-[91.5vh] p-[10px]">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
