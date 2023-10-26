import {
  Menu,
  MenuList,
  MenuButton,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";

export default function SelectMenu({ title, list, handleSelectedKeyword }) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton>{title}</MenuButton>
      <MenuList minWidth="240px">
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
