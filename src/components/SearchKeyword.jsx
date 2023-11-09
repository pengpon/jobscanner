import { useState } from 'react'
import { HStack, Box, Flex, Tag, TagLabel } from "@chakra-ui/react";
import SelectMenu from "./SelectMenu";
import twCity from "../utils/city";
import platform from "../utils/platform";

export default function SearchKeyword({handleSearch}) {
  const [keywords, setKeywords] = useState({locations: [], platforms: []});
  const keywordList = [
    {
      title: "刊登平台",
      dataType: "platforms",
      option: platform
    },
    {
      title: "地點",
      dataType: "locations",
      option: twCity
    }
  ];

  const handleSelectedKeyword = (keyword, type) => {
    if (!keywords[type].includes(keyword)) {
      setKeywords({...keywords, [type]: [...keywords[type], keyword]})
    } else {
      let data = [...keywords[type]].filter(item => item !== keyword);
      setKeywords({...keywords, [type]: data})
    }
    handleSearch(keyword, type)
  }

  const selectMenus = keywordList.map(item => (
    <SelectMenu
      key={item.dataType}
      title={item.title}
      list={item.option}
      type={item.dataType}
      handleSelectedKeyword={handleSelectedKeyword}
    />
  ))

  return (
    <Box>
      <HStack mb={4}>
      {selectMenus}
      </HStack>

      <Flex gap={2} wrap="wrap">
        {[...keywords.platforms, ...keywords.locations].map((item) => (
          <Tag
            size="md"
            key={item}
            borderRadius="full"
            variant="solid"
            colorScheme="blue"
          >
            <TagLabel>{item}</TagLabel>
          </Tag>
        ))}
      </Flex>
    </Box>
  );
}
