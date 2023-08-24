"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { defaultTheme } from "./themes/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={defaultTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}

export function ColorMode() {
  return (
    <ColorModeScript initialColorMode={defaultTheme.config.initialColorMode} />
  );
}

export {
  Container,
  Box,
  Wrap,
  Text,
  Button,
  Flex,
  Textarea,
  Stack,
} from "@chakra-ui/react";
