import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Home() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box
      minH="100vh"
      bg={colorMode === "light" ? "cream.light" : "cream.dark"}
      color={colorMode === "light" ? "crimson.dark" : "crimson.light"}
      p={8}
    >
      <VStack gap={8}>
        <Heading>TnT Nupes</Heading>
        <HStack gap={4}>
          <Button as={NextLink} href="/signin">
            Sign In
          </Button>
          <Button as={NextLink} href="/signup">
            Sign Up
          </Button>
        </HStack>
        <Button onClick={toggleColorMode}>
          Switch to {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </VStack>
    </Box>
  );
}
