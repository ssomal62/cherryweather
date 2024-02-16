import React from "react";
import {Badge} from "@nextui-org/react";
import {GoBell} from "react-icons/go";

// 알림 아이콘과 함께 뱃지를 포함한 GoBell 아이콘을 렌더링하는 함수형 컴포넌트
export const GoBellWithNotificationIcon = ({setIsOpen, isOpen}) => {
  return (
    <Badge content={9} overlap="circle" color="danger">
      <div style={{marginTop: 6}}>
        <GoBell onClick={() => setIsOpen(!isOpen)} />{" "}
        {/* GoBell 아이콘을 클릭하면 setIsOpen을 호출하여 팝오버 열기/닫기 */}
      </div>
    </Badge>
  );
};
