import React, {useEffect, useState} from "react";
import {GoBell} from "react-icons/go";
import {Badge} from "@nextui-org/react";
import DropDownNotification from "./DropDownNotification";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import LoginVerificationModal from "../../utils/LoginVerificationModal";

const GoBellDropNotificationIcon = ({onClick}) => {
  const [isOpen, setIsOpen] = useState(false);

  /////
  const isLogin = useRecoilValue(IsLoginAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 화면이 로드될 때 로그인 상태를 확인하여 모달 열기
    if (!isLogin && isOpen) {
      setIsOpen(false); // 열려있는 경우 닫기
      setIsModalOpen(true);
    }
  }, [isLogin, isOpen]);

  const handleClick = () => {
    // 아이콘 클릭 핸들러
    if (!isLogin) {
      setIsModalOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };
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
          onClick={handleClick}
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
      <LoginVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default GoBellDropNotificationIcon;
