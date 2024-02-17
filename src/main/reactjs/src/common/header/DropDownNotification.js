// DropDownNotification.js

import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

const DropDownNotification = () => {
  return (
    <Dropdown isOpen={true} placement="bottom-right">
      <DropdownTrigger>
        <span></span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Notifications" color="danger">
        <DropdownItem key="weather">Weather notification</DropdownItem>
        <DropdownItem key="community">Community notification</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownNotification;
