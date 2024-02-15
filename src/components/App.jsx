import axios from "axios";
import { useEffect, useState } from "react";
import {
  ChakraProvider,
  Container,
  Box,
  theme,
  Image,
  Button,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import JobCardList from "./JobCardList";
import SearchKeyword from "./SearchKeyword";
import { jobFormat } from "../utils/format";
import Logo from "../assets/jobscanner-logo.png";
import "./App.css";

function App() {
  // original data
  const [data, setData] = useState({ result: [], updateTime: "" });

  // after apply filter
  const [filterJobData, setFilterJobData] = useState([]);

  // filter conditions
  const [filter, setFilter] = useState({ locations: [], platforms: [] });

  // sort condition
  const [isSortByName, setIsSortByName] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // // use mock data
      // let res = await axios.get("http://localhost:3000/jobs");

      // use cloud storage
      let res = await axios.get(
        "https://storage.googleapis.com/job-list/jobs_list.json"
      );

      const data = jobFormat(res);
      setData({ result: data.result, updateTime: data.updateTime });
      setFilterJobData([...data.result]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filter.locations.length === 0 && filter.platforms.length === 0) {
      setFilterJobData([...data.result]);
    }
  }, [filter, data]);

  // filter data
  const filterJob = (jobs, filters) => {
    const { platforms, locations } = filters;

    return jobs.filter((job) => {
      let isPlatformMatch, isLocationMatch;

      isPlatformMatch = platforms.some(function (platform) {
        let regex = new RegExp(platform);
        return regex.test(job.source);
      });

      isLocationMatch = locations.some(function (location) {
        let regex = new RegExp(location);
        return regex.test(job.location);
      });

      // default = select all
      if (platforms.length === 0) isPlatformMatch = true;
      if (locations.length === 0) isLocationMatch = true;

      if (isPlatformMatch && isLocationMatch) return job;
    });
  };

  const handleSearch = (item, type) => {
      let keywords;
      if (filter[type].includes(item)) {
        keywords = [...filter[type]].filter(
          (keyword) => keyword !== item
        );
      } else {
        keywords = [...filter[type], item];
      }
      setFilter({ ...filter, [type]: keywords });
      const result = filterJob(data.result, {...filter, [type]: keywords});
      setFilterJobData([...result]);

    setIsSortByName(true);
  };

  const sort = () => {
    let data = [...filterJobData];
    function sortBySalary(data) {
      let monthJobs = [],
        yearJobs = [],
        otherJobs = [];

      data.forEach((job) => {
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

      function sortFn(a, b) {
        return b.salary[0] - a.salary[0];
      }
      monthJobs.sort(sortFn);
      yearJobs.sort(sortFn);

      return [...monthJobs, ...yearJobs, ...otherJobs];
    }

    function sortByName(data) {
      let tmp = [...data];
      tmp.sort(function (a, b) {
        if (a.companyName > b.companyName) return 1;
        if (a.companyName < b.companyName) return -1;
        return 0;
      });
      return tmp;
    }

    if (isSortByName) {
      setIsSortByName(false);
      data = sortBySalary(data);
    } else {
      setIsSortByName(true);
      data = sortByName(data);
    }

    setFilterJobData([...data]);
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
            <SearchKeyword handleSearch={handleSearch} />
          </Box>
          <Box align="end">
            <Button variant="ghost" color="gray.500" onClick={sort}>
              {isSortByName ? "預設：公司名稱" : "薪資由高到低"}
              <ArrowDownIcon boxSize={4} ml={4} />
            </Button>
            <Box textAlign="right" fontSize="sm">
              資料更新時間:{data.updateTime}
            </Box>
            <Box textAlign="center" fontSize="md">
              共有 {filterJobData.length} 筆職缺
            </Box>
          </Box>
        </Box>
        <Box textAlign="center" fontSize="xl" px={5}>
          {filterJobData.length !== 0 ? (
            <JobCardList jobs={filterJobData}></JobCardList>
          ) : (
            <Box w={{md: '80%', lg:'100vw'}}>請重新選擇條件</Box>
          )}
        </Box>
      </Container>
    </ChakraProvider>
  );
}
export default App;
