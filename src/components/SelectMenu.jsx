import {
  Button,
  Menu,
  MenuList,
  MenuButton,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function SelectMenu({ title, list, handleSelectedKeyword }) {
  return (
    <Menu closeOnSelect={true}>
      <MenuButton as={Button} colorScheme='blue' size='md' >{title} <ChevronDownIcon/></MenuButton>
      <MenuList>
        <MenuOptionGroup type="checkbox">
          {list.map((item) => (
            <MenuItemOption
              key={item.value}
              value={item.value}
              onClick={() => handleSelectedKeyword(item.name)}
            >
              {item.name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
