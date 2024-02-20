// DropDownNotification.js

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const DropDownNotification = () => {
  return (
    <Dropdown isOpen>
      <DropdownTrigger>
        <span></span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Notifications" color="danger">
        <DropdownItem key="weather">오늘의 날씨: 맑음, 20°C</DropdownItem>
        <DropdownItem key="community">새로운 댓글이 있습니다.</DropdownItem>
        <DropdownItem key="settings">설정 변경</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownNotification;
