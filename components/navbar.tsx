import { HStack, Text, Image, Hide, Stack, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <Box
      w={"100%"}
      bg={"rgba( 0, 0, 0, 0.15 )"}
      boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
      backdropFilter={"blur( 10.5px )"}
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
            <Text>Weather</Text>
            <Text>Weather</Text>
          </HStack>
        </Hide>
      </HStack>
    </Box>
  );
}

export default Navbar;
