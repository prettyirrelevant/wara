import { FC, ReactElement, useState } from "react";
import { Menu, MenuItem } from "@szhsin/react-menu";

const useAppMenu = (
  defaultOption: null | string = null,
  items: any[],
  toggleCallback?: (value: any) => any,
  uppercase = false,
  isTokens = false,
) => {
  const [activeOption, setActiveOption] = useState(defaultOption || items[0]);

  const AppMenu: FC<{ children: ReactElement }> = ({ children }) => {
    return (
      <div className="app-menu__container">
        <Menu
          align="end"
          transition
          menuButton={children}
          menuClassName={`app-menu ${isTokens ? "tokens" : ""}`}
          onItemClick={(e) => {
            setActiveOption(e.value);
            toggleCallback && toggleCallback(e.value);
          }}
        >
          {items?.map((slug, ind) => (
            <MenuItem key={ind} value={slug} className="menu-item" data-active={slug === activeOption}>
              <p
                style={{
                  textTransform: uppercase ? "uppercase" : "capitalize",
                }}
              >
                {slug}
              </p>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  return [AppMenu, activeOption];
};

export default useAppMenu;
