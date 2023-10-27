import { useState } from 'react'
import { HStack, Box, Flex, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import SelectMenu from "./SelectMenu";
import twCity from "../utils/city";
import platform from "../utils/platform";

export default function SearchKeyword({handleSearch}) {
  const [keywords, setKeywords] = useState({locations: [], platforms: []});

  // TODO: Refactor
  const handleSelectedPlatform = (platform) => {
    if (!keywords.platforms.includes(platform)) {
      setKeywords({...keywords, platforms: [...keywords.platforms, platform]})
    } else {
      let platforms = [...keywords.platforms].filter(item => item !== platform);
      setKeywords({...keywords, platforms})
    }
    handleSearch(platform, 'platforms')
  }

  const handleSelectedLocation = (location) => {
    if (!keywords.locations.includes(location)) {
      setKeywords({...keywords, locations: [...keywords.locations, location]})
    } else {
      let locations = [...keywords.locations].filter(item => item !== location);
      setKeywords({...keywords, locations})
    }
    handleSearch(location, 'locations')
  }

  return (
    <Box>
      <HStack mb={4}>
        <SelectMenu
          title="刊登平台"
          list={platform}
          handleSelectedKeyword={handleSelectedPlatform}
        />
        <SelectMenu
          title="地點"
          list={twCity}
          handleSelectedKeyword={handleSelectedLocation}
        />
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
            <TagCloseButton />
          </Tag>
        ))}
      </Flex>
    </Box>
  );
}
