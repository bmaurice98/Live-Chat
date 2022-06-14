import { Avatar, Tooltip } from "@chakra-ui/react";
import { m } from "framer-motion";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chatLogics";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className="flex" key={i}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  name={m.sender.name}
                  src={m.sender.image}
                  size="sm"
                  className="mt-[7px] mr-1"
                />
              </Tooltip>
            )}
            <span
              className={`${
                m.sender.id === user._id ? "bg-[#f3c349]" : "bg-[#53ff76cd]"
              } rounded-3xl py-2 px-4 max-w-[75%] my-1 `}
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
