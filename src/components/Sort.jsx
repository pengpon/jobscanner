import { HStack, Select, Box, Flex } from "@chakra-ui/react";
import {
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

export default function Search() {

  // TODO: get options from firestore
  // const dataSource = ['104', 'yourator', 'cakeresume'];
  // const locations = ['台北', '宜蘭'];
  return (
    <Box>
      <HStack mb={4}>
        <Select placeholder="刊登平台">
          <option value="one04">104</option>
          <option value="yourator">Yourator</option>
          <option value="cakeresume">CakeResume</option>
        </Select>
        <Select placeholder="地點">
          <option value="option1">台北</option>
          <option value="option2">宜蘭</option>
        </Select>
      </HStack>
      <Flex gap={2} wrap="wrap">
        {["台北", "宜蘭", "花蓮"].map((item) => (
          <Tag
            size="md"
            key="md"
            borderRadius="full"
            variant="solid"
            colorScheme="blue"
          >
            <TagLabel>{item}</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}

        {["yourator", "104",].map((item) => (
          <Tag
            size="md"
            key="md"
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
