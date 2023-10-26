import { HStack, Box, Flex } from "@chakra-ui/react";
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

import twCity from "../utils/city";
import platform from "../utils/platform";

import SelectMenu from "./SelectMenu";
import { useState } from "react";

export default function SearchKeyword() {
  const [keywords, setKeywords] = useState([]);
  const handleSelectedKeyword = (keyword) => {
    let newKeywords = [...keywords];
    if (keywords.includes(keyword)) {
      newKeywords = newKeywords.filter((item) => item !== keyword);
    } else {
      newKeywords = [...newKeywords, keyword];
    }
    setKeywords(newKeywords);
  };
  return (
    <Box>
      <HStack mb={4}>
        <SelectMenu
          title="刊登平台"
          list={platform}
          handleSelectedKeyword={handleSelectedKeyword}
        />
        <SelectMenu
          title="地點"
          list={twCity}
          handleSelectedKeyword={handleSelectedKeyword}
        />
      </HStack>

      <Flex gap={2} wrap="wrap">
        {keywords.map((item) => (
          <Tag
            size="md"
            key={item}
            borderRadius="full"
            variant="solid"
            colorScheme="blue"
          >
            <TagLabel>{item}</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}
      </Flex>
    </Box>
  );
}
