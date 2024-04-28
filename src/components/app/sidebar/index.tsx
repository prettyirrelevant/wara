import "./sidebar.scss";

import {
  Info,
  Moon,
  GearFine,
  DotsThree,
  Infinity,
  CalendarDots,
  ArrowFatLineUp,
  GitPullRequest,
  ArrowFatLineDown,
} from "@phosphor-icons/react";
import { Dna } from "lucide-react";
import { NavLink } from "react-router-dom";

const iconSize = 22;

const navlinks = {
  overview: [
    {
      name: "P2P",
      link: "/",
      icon: <Infinity size={iconSize} className="sidebar__menu-item-icon" />,
    },
    {
      name: "Deposit",
      link: "/deposit",
      icon: <ArrowFatLineDown size={iconSize} className="sidebar__menu-item-icon" />,
    },
    {
      name: "Withdrawal",
      link: "/withdrawal",
      icon: <ArrowFatLineUp size={iconSize} className="sidebar__menu-item-icon" />,
    },
    {
      name: "History",
      link: "/history",
      icon: <CalendarDots size={iconSize} className="sidebar__menu-item-icon" />,
    },
  ],
  system: [
    {
      name: "Settings",
      link: "/settings",
      icon: <GearFine size={iconSize} className="sidebar__menu-item-icon" />,
    },
    {
      name: "Issues",
      link: "https://github.com/prettyirrelevant/wrapped-naira/issues",
      icon: <Info size={iconSize} className="sidebar__menu-item-icon" />,
    },
  ],
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" className="sidebar__logo">
        <div className="logo-icon">
          <Dna size={20} strokeWidth={2.2} />
        </div>

        <h1>Wrapped Naira</h1>
      </NavLink>

      <div className="sidebar__menu">
        <p className="sidebar__menu-header">Overview</p>
        <ul>
          {navlinks.overview.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={item?.link + ""}
                  className={({ isActive }) =>
                    isActive ? "sidebar__menu-item sidebar__menu-item--active" : "sidebar__menu-item"
                  }
                >
                  {item?.icon}
                  <p>{item?.name}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <p className="sidebar__menu-header">System</p>
        <ul>
          {navlinks.system.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={item?.link + ""}
                  {...(item?.link.includes("http") && {
                    target: "_blank",
                    rel: "noreferrer",
                  })}
                  className={({ isActive }) =>
                    isActive ? "sidebar__menu-item sidebar__menu-item--active" : "sidebar__menu-item"
                  }
                >
                  {item?.icon}
                  <p>{item?.name}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="theme-switch">
          <div className="label">
            <Moon size={19} className="sidebar__menu-item-icon" />
            <p>Dark Mode</p>
          </div>

          <button>
            <DotsThree weight="bold" size={19} className="sidebar__menu-item-icon" />
          </button>
        </div>
      </div>

      <div className="sidebar__footer">
        <a target="_blank" className="c-button" href="https://github.com/prettyirrelevant/wrapped-naira">
          <p>GitHub </p>
          <GitPullRequest weight="fill" size="16" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
