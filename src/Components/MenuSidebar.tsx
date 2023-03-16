import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiShoppingCart,
  FiBookOpen,
  FiBarChart,
  FiBox,
  FiUsers
} from 'react-icons/fi';

const Sidebar = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuItems, setMenuItems] = useState([
    { label: "Item 1", path: "/" },
    { label: "Item 2", path: "/item2" },
    { label: "Item 3", path: "/item3" },
  ]);

  const handleMenuItemClick = () => {
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Open Menu"
        size="md"
        mr={2}
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
      <Stack m={2}>
        <FiUsers />
      </Stack>
      <Stack m={2}>
        <FiBookOpen />
      </Stack>

      <Box
        bg={useColorModeValue("white", "gray.800")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        top={0}
        left={0}
        h="full"
        pb="8"
        zIndex="99"
        shadow="md"
        overflowX="hidden"
        overflowY="auto"
        transition="all .3s"
        transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)" }}
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: useColorModeValue("gray.500", "gray.400"),
            borderRadius: "24px",
          },
        }}
      >
        <Flex
          h="20"
          alignItems="center"
          mx="4"
          justifyContent="space-between"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Logo
          </Text>
          <IconButton
            aria-label="Close Menu"
            size="md"
            icon={<CloseIcon />}
            display={{ base: "inherit", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        <Stack spacing="4" mt="10" mx="4">
          {menuItems.map((menuItem, index) => (
            <Text
              key={index}
              onClick={handleMenuItemClick}
              _hover={{ cursor: "pointer", color: "gray.500" }}
            >
              {menuItem.label}
            </Text>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
