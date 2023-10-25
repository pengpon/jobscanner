import { SimpleGrid } from "@chakra-ui/react";
import { JobCard } from "./JobCard";

export default function JobCardList({ jobs }) {
  const jobsData = [...jobs];
  const jobItems = jobsData.map((job) => (
    <JobCard key={job.key} job={job}></JobCard>
  ));

  return (
    <SimpleGrid columns={{ md: 1, lg: 3 }} spacing={5}>
      {jobItems}
    </SimpleGrid>
  );
}
