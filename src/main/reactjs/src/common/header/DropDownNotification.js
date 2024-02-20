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
        <DropdownItem key="sign-in">회원 가입을 환영합니다.</DropdownItem>
        <DropdownItem key="login">000님 의 로그인을 축하드립니다.</DropdownItem>
        <DropdownItem key="mypage">비밀번호가 변경되었습니다.</DropdownItem>
        <DropdownItem key="weather">오늘의 날씨: 맑음, 20°C</DropdownItem>
        <DropdownItem key="community">모임이 생성되었습니다.</DropdownItem>
        <DropdownItem key="room">새로운 정모가 개설 되었습니다.</DropdownItem>
        <DropdownItem key="chat">설정 변경</DropdownItem>
        <DropdownItem key="ai">ai 이미지가 생성되었습니다.</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownNotification;
