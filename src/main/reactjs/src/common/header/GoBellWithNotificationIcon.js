// GoBellDropNotificationIcon.js

import React, { useState } from 'react';
import { GoBell } from 'react-icons/go';
import { Badge } from '@nextui-org/react';
import DropDownNotification from './DropDownNotification'; // 새로 추가한 DropDown 컴포넌트를 import합니다.

const GoBellDropNotificationIcon = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div onClick={onClick}>
      <div> {/* Badge와 DropDown 컴포넌트를 하나의 div로 감싸기 */}
        <Badge content="99+" color="danger" placement="bottom-right">
          <GoBell onClick={toggleDropdown} style={{ fontSize: '1.5em', cursor: 'pointer' }} />
        </Badge>
        {isOpen && (
          <DropDownNotification />
        )}
      </div>
    </div>
  );
};
export default GoBellDropNotificationIcon;
