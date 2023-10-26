import { HStack, Box, Flex } from "@chakra-ui/react";
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

import twCity from "../utils/city";
import platform from "../utils/platform";

import SelectMenu from "./SelectMenu";
import { useKeywordStore } from "../store/keyword";

export default function SearchKeyword() {
  const {
    locations,
    platforms,
    addLocation,
    addPlatform,
    removeLocation,
    removePlatform,
  } = useKeywordStore();

  const handleSelectedPlatform = (platform) => {
    if (platforms.includes(platform)) {
      removePlatform(platform);
    } else {
      addPlatform(platform);
    }
  };

  const handleSelectedLocation = (location) => {
    if (locations.includes(location)) {
      removeLocation(location);
    } else {
      addLocation(location);
    }
  };
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
        {[...platforms, ...locations].map((item) => (
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
