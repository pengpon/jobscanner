/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Tag,
  HStack,
  Box,
  Badge,
  Flex,
  Avatar,
  Link,
  Icon,
} from "@chakra-ui/react";
import { MdLocationOn, MdAttachMoney } from "react-icons/md";
import one04Logo from "../assets/104-logo.png";
import { toThousandSeparator } from "../utils/format";

export function JobCard({ job }) {
  const data = { ...job };
  const badgeColor = (jobSource) => {
    let color;
    switch (jobSource) {
      case "104":
        color = "orange";
        break;
      case "yourator":
        color = "blue";
        break;
      case "cakeresume":
        color = "green";
        break;
      default:
        color = "blue";
    }
    return color;
  };

  return (
    <Card maxW={{ sm: "xl", lg: "md" }}>
      <CardBody>
        <HStack mb={4}>
          <Avatar
            size="sm"
            src={data.companyLogo ? data.companyLogo : one04Logo}
          />
          <Text fontSize="sm" noOfLines={1}>
            {data.companyName}
          </Text>
        </HStack>
        <Flex direction="column" textAlign="left" gap="2">
          <Heading size="md">
            <Link href={data.url} isExternal noOfLines={1}>
              {data.name}
            </Link>
          </Heading>
          <Box>
            <Badge
              variant="solid"
              colorScheme={badgeColor(data.source)}
              fontSize="xs"
            >
              {data.source}
            </Badge>
          </Box>
          <Text fontSize="sm" noOfLines={3} align="start">
            {data.description}
          </Text>
        </Flex>
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap">
        <Flex gap={2} wrap="wrap">
          <Tag color="gray.500">
            <Icon as={MdLocationOn} />
            {data.location}
          </Tag>
          <Tag color="gray.500">
            <Icon as={MdAttachMoney} />
            {toThousandSeparator(data.salary[0])} ~{" "}
            {toThousandSeparator(data.salary[1])} ({data.salaryType})
          </Tag>
        </Flex>
      </CardFooter>
    </Card>
  );
}
