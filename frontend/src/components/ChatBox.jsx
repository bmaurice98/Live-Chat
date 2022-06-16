import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/ChatProvider";
import { SingleChat } from "./SingleChat";

export const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedchat } = ChatState();

  return (
    <Box
      className={`${
        selectedchat ? "flex" : "none"
      }  md:flex flex-col w-full md:w-[68%] p-3 bg-gray-700 border-slate-800 rounded-md border-2 items-center`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};
