import { useEffect, useState } from "react";
import axios from "axios";

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
import Logo from "./assets/jobscanner-logo.png";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [updateTime, setUpdateTime] = useState('');

  useEffect(()=> {
    getAllJobs();
  }, []);

  const getAllJobs = async() => {
    // use cloud storage
    // let res = await axios.get("https://storage.googleapis.com/job-list/jobs_list.json");

    // use mock data
    let res = await axios.get("http://localhost:3000/jobs");

    let data = res.data.result;
    let timestamp = res.data.updateTime;
    let date = new Date(timestamp)
    let time = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

    // filter duplicate key
    const obj = {};
    data.forEach((item) => {
      obj[`${item.key}`] = item
    })
    let result = Object.values(obj);
    setJobs([...result]);
    setUpdateTime(time)
  };

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
        <Box textAlign="center" fontSize="xl" px={5}>
          <Box textAlign="right" fontSize="sm">資料更新時間:{updateTime}</Box>
          <JobCardList jobs={jobs}></JobCardList>
        </Box>
      </Container>
    </ChakraProvider>
  );
}
export default App;
