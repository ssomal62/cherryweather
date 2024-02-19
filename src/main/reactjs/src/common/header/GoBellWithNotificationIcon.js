import React, {useState} from "react";
import {GoBell} from "react-icons/go";
import {Badge} from "@nextui-org/react";
import DropDownNotification from "./DropDownNotification";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";

const GoBellDropNotificationIcon = ({onClick}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = useRecoilValue(IsLoginAtom);

  const handleBellClick = () => {
    if (isLogin) {
      toggleDropdown();
    }
    // 로그인 상태와 상관없이 알림 테스트 함수를 호출합니다.
    onClick();
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        style={{position: "relative", display: "flex", alignItems: "center"}}
      >
        <GoBell
          style={{
            fontSize: "1.4em",
            position: "relative",
          }}
          onClick={handleBellClick}
        />
        {isLogin && (
          <Badge
            content="99+"
            color="danger"
            style={{position: "absolute", top: "-20px", right: "0px"}} // 위치를 조정합니다.
          />
        )}

        {isLogin && isOpen && <DropDownNotification />}
      </div>
    </>
  );
};

export default GoBellDropNotificationIcon;
