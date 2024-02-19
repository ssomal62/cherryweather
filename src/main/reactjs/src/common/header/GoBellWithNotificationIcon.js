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
    <div
      style={{position: "relative", cursor: "pointer", alignItems: "center"}}
    >
      <div
        style={{position: "relative", display: "inline-block", marginTop: 25}}
      >
        <GoBell style={{fontSize: "1.4em"}} onClick={handleBellClick} />
        {isLogin && (
          <Badge
            content="99+"
            color="danger"
            placement="top-right" // 배지를 위로 올리기 위해 placement를 top-right로 변경합니다.
            style={{position: "absolute", top: "-45px", right: "-18px"}} // 위치를 조정합니다.
          />
        )}
      </div>
      {isLogin && isOpen && <DropDownNotification />}
    </div>
  );
};

export default GoBellDropNotificationIcon;
