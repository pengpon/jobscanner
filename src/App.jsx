import { useEffect } from "react";
import { useJobStore } from "./store/job";
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
import SearchKeyword from "./components/SearchKeyword";
import Logo from "./assets/jobscanner-logo.png";
import "./App.css";

function App() {
  const { jobs, updateTime, fetchData } = useJobStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortBySalary = () => {
    let monthJobs = [],
      yearJobs = [],
      otherJobs = [];

    jobs.forEach((job) => {
      switch (job.salaryType) {
        case "month":
          monthJobs.push(job);
          break;
        case "year":
          yearJobs.push(job);
          break;
        case "other":
          otherJobs.push(job);
          break;
        default:
          otherJobs.push(job);
      }
    });

    const sortFn = (a, b) => {
      return b.salary[0] - a.salary[0];
    };
    monthJobs.sort(sortFn);
    yearJobs.sort(sortFn);
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
            <SearchKeyword />
          </Box>
          <Box align="end">
            <Button variant="ghost" color="gray.500" onClick={sortBySalary}>
              薪資高到低
              <ArrowDownIcon boxSize={4} ml={4} />
            </Button>
            <Box textAlign="right" fontSize="sm">
              資料更新時間:{updateTime}
            </Box>
            <Box textAlign="center" fontSize="md">共有 {jobs.length} 筆職缺</Box>
          </Box>
        </Box>
        <Box textAlign="center" fontSize="xl" px={5}>
          <JobCardList jobs={jobs}></JobCardList>
        </Box>
      </Container>
    </ChakraProvider>
  );
}
export default App;
