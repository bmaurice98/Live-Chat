import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import React from "react";

export const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      className="flex px-1 py-1 m-[1px] mb-1 rounded-md text-md cursor-pointer items-center justify-between"
      background={"whatsapp.300"}
      onClick={handleFunction}
    >
      <span className="ml-1 text-gray-800">{user.name}</span>
      <CloseIcon className="mx-1" onClick={handleFunction} />
    </Box>
  );
};
