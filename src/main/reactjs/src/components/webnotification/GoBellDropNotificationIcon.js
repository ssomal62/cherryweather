import React, {useEffect, useState} from "react";
import {GoBell} from "react-icons/go";
import {Badge} from "@nextui-org/react";
import DropDownNotification from "./DropDownNotification";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import LoginVerificationModal from "../../utils/LoginVerificationModal";
import {userInfoState} from "../../recoil/hooks/UseFetchUserInfo";
import {alramListState} from "../../recoil/hooks/UseAlramApi";

const GoBellDropNotificationIcon = ({onClick}) => {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useRecoilValue(userInfoState); // 알림 수신 동의 상태 가져옴.
  const alarmList = useRecoilValue(alramListState);
  const isLogin = useRecoilValue(IsLoginAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 화면이 로드될 때 로그인 상태를 확인하여 모달 열기
    if (!isLogin && isOpen) {
      setIsOpen(false); // 열려있는 경우 닫기
      setIsModalOpen(true);
    }
  }, [isLogin, isOpen]);

  // 실제 알림 개수 계산(예시 alramList 사용)
  const actualNotificationCount = alarmList ? alarmList.length : 0;

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
        {isLogin &&
          userInfo &&
          userInfo.agreementGetNotified &&
          actualNotificationCount > 0 && ( // 알림 수신 동의가 true일 때만 표시
            <Badge
              content={
                actualNotificationCount > 99
                  ? "99+"
                  : actualNotificationCount.toString()
              }
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
