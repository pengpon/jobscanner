import {
  ChakraProvider,
  Container,
  Box,
  theme,
  Image,
  Button,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import JobCardList from "./components/JobCardList";
import Search from "./components/Sort";
import data from "./mock/db.json";
import Logo from "./assets/jobscanner-logo.png";
import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW={1200} centerContent p={0}>
        <Box
          w="100%"
          mb={20}
          textAlign="start"
          pos="sticky"
          top={0}
          zIndex={1}
          bg="white"
          px={4}
        >
          <Image
            src={Logo}
            mb={10}
            w={{ md: "80%", lg: 300 }}
            m={{ md: "auto", lg: 0 }}
          />
          <Box w={{ md: "100%", lg: "50%" }}>
            <Search />
          </Box>
          <Box align="end">
            <Button variant="ghost" color="gray.500">
              薪資高到低
              <ArrowDownIcon boxSize={4} ml={4} />
            </Button>
          </Box>
        </Box>
        <Box textAlign="center" fontSize="xl" centerContent px={5}>
          <JobCardList jobs={data}></JobCardList>
        </Box>
      </Container>
    </ChakraProvider>
  );
}
export default App;
