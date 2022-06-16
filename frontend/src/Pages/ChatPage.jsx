import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { SideDrawer } from "../components/miscellaneous/SideDrawer";
import { MyChats } from "../components/MyChats";
import { ChatBox } from "../components/ChatBox";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="w-full text-white font-serif">
      {user && <SideDrawer />}
      <Box className="flex relative justify-between w-full lg:h-[91.5vh] p-[10px]">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
