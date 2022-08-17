import { HamburgerIcon } from "@chakra-ui/icons";
import {
  HStack,
  Text,
  Image,
  Hide,
  Box,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useRef } from "react";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <Box
      w={"100%"}
      // bg={"rgba( 0, 0, 0, 0.15 )"}
      // boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
      // backdropFilter={"blur( 10.5px )"}
    >
      <HStack
        justify={"space-between"}
        maxW={"7xl"}
        mx={"auto"}
        p={"5"}
        color={"white"}
      >
        <Link href={"/"}>
          <Image
            alt="navlogo"
            w={"44px"}
            objectFit={"contain"}
            cursor={"pointer"}
            src={
              "https://www.nicepng.com/png/full/870-8701139_your-logo-here-png-gloucester-road-tube-station.png"
            }
          />
        </Link>
        <Hide below="md">
          <HStack spacing={5}>
            <Link href="/weather">Weather</Link>
            <Link href="/calendar">Calendar</Link>
            <Link href="/calculator">Calculator</Link>
            <Link href="/todo">Todo</Link>
          </HStack>
        </Hide>
        <Hide above="md">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem>
                <Link href="/weather">Weather</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/calendar">Calendar</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/calculator">Calculator</Link>
              </MenuItem>
              <MenuItem>
                {" "}
                <Link href="/todo">Todo</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Hide>
      </HStack>
    </Box>
  );
}

export default Navbar;
