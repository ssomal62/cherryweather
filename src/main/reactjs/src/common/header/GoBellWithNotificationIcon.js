import React, {useEffect, useState} from "react";
import {GoBell} from "react-icons/go";
import {Badge} from "@nextui-org/react";
import DropDownNotification from "./DropDownNotification";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import {
  useFetchUserInfo,
  userInfoState,
} from "../../recoil/hooks/UseFetchUserInfo";

const GoBellDropNotificationIcon = ({onClick}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = useRecoilValue(IsLoginAtom);

  // userInfo 로그인, 회원정보 등을 불러오기 위한 recoil 사용 예제
  const userInfo = useRecoilValue(userInfoState);
  const userInfoFetch = useFetchUserInfo();

  useEffect(() => {
    userInfoFetch();
  }, []);
  // 콘솔로 확인하였을 때, 내 이름이 찍히는 것을 확인했음.
  console.log(userInfo.name);

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
            style={{position: "absolute", top: "-15px", right: "3px"}} // 위치를 조정합니다.
          />
        )}

        {isLogin && isOpen && <DropDownNotification />}
      </div>
    </>
  );
};

export default GoBellDropNotificationIcon;
