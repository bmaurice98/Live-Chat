import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import React from "react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { UserBadgeItem } from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";

export const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();

  const { selectedChat, setSelectedchat, user } = ChatState();

  const handleRemove = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      user._id !== userToRemove._id
    ) {
      toast({
        title: "Only Admins can remove users from the group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );

      userToRemove._id === user._id ? setSelectedchat() : setSelectedchat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      onClose();
      return;
    } catch (error) {
      toast({
        title: "Error Occured",
        meesage: "Failed to remove user from chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      return toast({
        title: "Missing Rename Field",
        meesage:
          "Please enter something in the field to change the groupchat name",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );

      setSelectedchat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.resoponse.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!search) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      // if (data.users.email.substring(0, str.indexOf("@")).includes(search))
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        meesage: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User already exists in group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only group Admin can add users to chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );
      console.log(data);
      setSelectedchat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        message: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <IconButton
        className="flex"
        icon={<ViewIcon />}
        color={"whatsapp.500"}
        variant={"ghost"}
        size={1}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex justify-center">
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col justify-between items-center">
            <Box className="flex w-full flex-wrap pb-2">
              {selectedChat.users.map((u, index) => (
                <UserBadgeItem
                  key={user._id + index.toString()}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl className="flex">
              <Input
                placeholder="Chat name"
                mb={3}
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
              <Button
                variant={"solid"}
                colorScheme={"whatsapp"}
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl className="flex flex-col">
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {loading ? (
                <Spinner />
              ) : (
                searchResult?.map((u) => (
                  <UserListItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleAddUser(u)}
                  />
                ))
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
