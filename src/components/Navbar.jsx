import React, { useState } from "react";
import displayLogo from "../assets/Display.svg";
import vbutton from "../assets/down.svg";

const NavBar = ({
  onSortByTitle,
  onSortByPriority,
  onGroupByPriority,
  onGroupByStatus,
  onGroupByUser,
  isGroupedByPriority,
  isGroupedByStatus,
  isGroupedByUser,
}) => {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [isGroupingDropdownOpen, setIsGroupingDropdownOpen] = useState(false);
  const [isOrderingDropdownOpen, setIsOrderingDropdownOpen] = useState(false);
  const [isStatusOptionsOpen, setIsStatusOptionsOpen] = useState(false);
  const [isPriorityOptionsOpen, setIsPriorityOptionsOpen] = useState(false);

  // Toggle the display dropdown (Grouping + Ordering)
  const toggleDisplayDropdown = () => {
    setIsDisplayOpen(!isDisplayOpen);
    setIsGroupingDropdownOpen(false);
    setIsOrderingDropdownOpen(false);
    setIsStatusOptionsOpen(false);
    setIsPriorityOptionsOpen(false);
  };

  // Toggle the Grouping dropdown with "Status" placeholder
  const toggleGroupingDropdown = () => {
    setIsGroupingDropdownOpen(!isGroupingDropdownOpen);
    setIsStatusOptionsOpen(false); // Close Status options by default
  };

  // Toggle the Ordering dropdown with "Priority" placeholder
  const toggleOrderingDropdown = () => {
    setIsOrderingDropdownOpen(!isOrderingDropdownOpen);
    setIsPriorityOptionsOpen(false); // Close Priority options by default
  };

  // Toggle the Status options (inside Grouping)
  const toggleStatusOptions = () => {
    setIsStatusOptionsOpen(!isStatusOptionsOpen);
  };

  // Toggle the Priority options (inside Ordering)
  const togglePriorityOptions = () => {
    setIsPriorityOptionsOpen(!isPriorityOptionsOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Display Option */}
        <div className="display-container" onClick={toggleDisplayDropdown}>
          <img src={displayLogo} alt="Logo" className="logo" />
          <span>Display</span>
          <img src={vbutton} className="chevron-icon" />
        </div>

        {/* Dropdown for Display (Containing Grouping and Ordering) */}
        {isDisplayOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <span className="title">Grouping</span>
              <div className="select-box" onClick={toggleGroupingDropdown}>
                <span>Status</span>
                <img src={vbutton} className="chevron-icon" />
              </div>
            </div>

            <div className="dropdown-item">
              <span className="title">Ordering</span>
              <div className="select-box" onClick={toggleOrderingDropdown}>
                <span>Priority</span>
                <img src={vbutton} className="chevron-icon" />
              </div>
            </div>
          </div>
        )}

        {/* Dropdown for Grouping (Status options) */}
        {isGroupingDropdownOpen && (
          <div className="right-dropdown-menu right-dropdown">
            <button className="right-dropdown-item" onClick={onGroupByStatus}>
              {isGroupedByStatus ? "Ungroup by Status" : "Group by Status"}
            </button>
            <button className="right-dropdown-item" onClick={onGroupByPriority}>
              {isGroupedByPriority
                ? "Ungroup by Priority"
                : "Group by Priority"}
            </button>
            <button className="right-dropdown-item" onClick={onGroupByUser}>
              {" "}
              {isGroupedByUser ? "Ungroup by User" : "Group by User"}
            </button>
          </div>
        )}

        {/* Dropdown for Ordering (Priority options) */}
        {isOrderingDropdownOpen && (
          <div className="right-dropdown-menu right-dropdown">
            <button className="right-dropdown-item" onClick={onSortByPriority}>
              <span>Priority</span>
            </button>
            <button className="right-dropdown-item" onClick={onSortByTitle}>
              <span>title</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
