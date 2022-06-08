import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";

export const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <Box>
      <Tooltip label="Search Users to chat" hasArrow placement="bottom">
        <Button variant={"ghost"} color={"whatsapp.300"}>
          <i class="fa-solid fa-magnifying-glass"></i>
          <Text className="hidden md:flex p-1 ">Search User</Text>
        </Button>
      </Tooltip>
    </Box>
  );
};

export default SideDrawer;
