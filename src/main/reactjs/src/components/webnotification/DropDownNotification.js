import React, { useEffect, useRef, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  useFetchUserInfo,
  userInfoState,
} from "../../recoil/hooks/UseFetchUserInfo";
import { useNavigate } from "react-router-dom";
// import {UseFetchWeather} from "../../recoil/hooks/UseWeatherData";
import { alramListState, useAlarmData } from "../../recoil/hooks/UseAlramApi";
import { instance } from "../../recoil/module/instance";
import Cookies from "universal-cookie";
const DropDownNotification = () => {
  const userInfo = useRecoilValue(userInfoState);
  const userInfoFetch = useFetchUserInfo();
  const navigate = useNavigate(); // useNavigate 훅 사용하기
  // const {fetchData, data: weatherData} = UseFetchWeather("/weather/daily"); // 날씨 데이터 가져오기
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [alarmList, setAlarmList] = useRecoilState(alramListState);
  const cookie = new Cookies();
  useEffect(() => {
    // fetchData();
    userInfoFetch();
  }, []);
  useEffect(() => {
    // 알림 수신 동의가 false 일 경우 드롭다운을 닫는다.
    setIsOpen(userInfo.agreementGetNotified);
  }, [userInfo.agreementGetNotified]);
  useAlarmData({ state: alramListState, dynamicPath: "" });
  const alramList = useRecoilValue(alramListState);
  alramList.forEach((alarm) => {
    console.log("알람 생성 시간:", new Date(alarm.createdAt).toISOString());
  });
  // 새로운 배열을 만들어서 작업합니다.
  const sortedAlramList = [...alramList].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const displayedAlramList = sortedAlramList.slice(0, 5);
  // 현재 알림과 지난 알림을 분리한다.
  const now = new Date();
  const sixHourAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000); // 1시간 전 시간을 계산한다.
  const currentAlarms = displayedAlramList.filter(
    (alram) => new Date(alram.createdAt) > sixHourAgo
  );
  console.log("현재알람 왜 안됌?", currentAlarms);
  const pastAlarms = displayedAlramList.filter(
    (alram) => new Date(alram.createdAt) <= sixHourAgo
  );
  // 알림 삭제 및 상세 페이지로 이동 함수(클럽 만들 떄)
  const deleteAlarmAndNavigate = async (alarmId, targetId) => {
    try {
      console.log("알람아이디" + alarmId);
      await instance.delete(`/alarm/${alarmId}`);
      // 삭제 후 알림 목록에서 해당 알림을 제거하고 상태를 업데이트
      const updatedAlarms = alarmList.filter(
        (alarm) => alarm.alarmId !== alarmId
      );
      console.log("현재알람 왜 안됌?", currentAlarms);
      setAlarmList(updatedAlarms);
      // 상세 페이지로 nav
      navigate(`/club-details/${targetId}`);
    } catch (error) {
      console.error("알림 삭제 실패:", error);
    }
  };
  const handleAlarmClick = async (item) => {
    // 알림 삭제 로직
    try {
      await instance.delete(`/alarm/${item.alarmId}`, {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      });
      // 상태 업데이트로 알림 목록에서 해당 알림 제거
      setAlarmList(alarmList.filter((alarm) => alarm.alarmId !== item.alarmId));
    } catch (error) {
      console.error("알림 삭제 실패:", error);
    }
    // 알림 유형에 따라 적절한 페이지로 이동
    switch (item.type) {
      case "CLUB":
        navigate(`/club-details/${item.targetId}`);
        break;
      case "PERSONALCHAT":
        navigate(`/chat/room/${item.targetId}`);
        break;
      case "CLUBJOIN":
      case "CLUBWAIT":
        // 클럽 가입 승인 요청 및 대기 알림일 경우 클럽 상세 페이지로 이동
        navigate(`/club-members/${item.targetId}`);
        break;
      case "LIKE":
        // 좋아요 알림일 경우 클럽 상세 페이지로 이동
        navigate(`/likes/${item.targetId}`);
        break;
      default:
        // 기타 알림 유형 처리
        break;
    }
  };
  // 클럽 가입 승인을 요청할 때 알림을 삭제하고 상세 페이지로 이동하는 함수
  const deleteAlarmAndNavigateForJoinRequest = async (alarmId, typeId) => {
    console.log("현재알람 왜 안됌?", currentAlarms);
    try {
      await instance.delete(`/alarm/${alarmId}`);
      const updatedAlarms = alarmList.filter(
        (alarm) => alarm.alarmId !== alarmId
      );
      setAlarmList(updatedAlarms);
      // 클럽 가입 요청에 대한 처리 후 적절한 페이지로 이동
      navigate(`/club-members/${typeId}`); // 예시 경로입니다. 실제 경로로 변경하세요.
    } catch (error) {
      console.error("알림 삭제 실패:", error);
    }
  };
  // 클럽 가입 승인 대기 시 알림을 삭제하고 상세 페이지로 이동하는 함수
  const deleteAlarmAndNavigateForApprovalWaiting = async (alarmId, typeId) => {
    try {
      await instance.delete(`/alarm/${alarmId}`);
      const updatedAlarms = alarmList.filter(
        (alarm) => alarm.alarmId !== alarmId
      );
      setAlarmList(updatedAlarms);
      // 클럽 가입 승인 대기에 대한 처리 후 적절한 페이지로 이동
      navigate(`/club-members/${typeId}`); // 예시 경로입니다. 실제 경로로 변경하세요.
    } catch (error) {
      console.error("알림 삭제 실패:", error);
    }
  };
  // 알림 삭제 및 1대1 채팅방으로 이동 함수
  const deleteAlarmAndNavigateToPersonalChatRoom = async (
    alarmId,
    targetId
  ) => {
    try {
      await instance.delete(`/alarm/${alarmId}`);
      // 삭제 후 알림 목록에서 해당 알림을 제거하고 상태를 업데이트
      const updatedAlarms = alarmList.filter(
        (alarm) => alarm.alarmId !== alarmId
      );
      setAlarmList(updatedAlarms);
      // 1대1 채팅방 상세 페이지로 이동
      navigate(`/chat/createchatroom/${targetId}`);
    } catch (error) {
      console.error("알림 삭제 실패:", error);
    }
  };
  // 알림 삭제 및 좋아요 상세 페이지로 이동 함수
  const deleteAlarmAndNavigateToLikesPage = async (alarmId, typeId) => {
    try {
      await instance.delete(`/alarm/${alarmId}`);
      // 삭제 후 알림 목록에서 해당 알림을 제거하고 상태를 업데이트
      const updatedAlarms = alarmList.filter(
        (alarm) => alarm.alarmId !== alarmId
      );
      setAlarmList(updatedAlarms);
      // 좋아요 상세 페이지로 이동
      navigate(`/likes/${typeId}`);
    } catch (error) {
      console.error("알림 삭제 실패:", error);
    }
  };
  console.log(deleteAlarmAndNavigateToPersonalChatRoom);
  // 알림 클럽에 가입할 때 알림 띄우기.
  return (
    <Dropdown
      isOpen={isOpen}
      onClick={() => {
        if (userInfo.agreementGetNotified) {
          console.log("현재알람 왜 안됌?", currentAlarms);
          setIsOpen(!isOpen);
        } else {
          setIsOpen(false);
        }
      }}
      ref={dropdownRef}
    >
      <DropdownTrigger>
        <span></span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Notifications" color="danger">
        <DropdownItem>
          <Chip size="sm" color="primary" variant="flat">
            {/* 이거 현재가 아니라 지난알림임 ㅇㅋ? 제발 까먹지말라고 적어놓음  */}
            알림
          </Chip>
        </DropdownItem>
        {pastAlarms.map((item, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              console.log("아이템 확인", item);
              switch (item.type) {
                case "CLUBJOIN":
                  deleteAlarmAndNavigateForJoinRequest(
                    item.alarmId,
                    item.typeId
                  ); // 클럽 가입 승인 요청 알림일 경우
                  break;
                case "CLUBWAIT":
                  deleteAlarmAndNavigateForApprovalWaiting(
                    item.alarmId,
                    item.typeId
                  ); // 클럽 가입 승인 대기 알림일 경우
                  break;
                case "CLUB":
                  deleteAlarmAndNavigate(item.alarmId, item.targetId); // 클럽 알림일 경우
                  break;
                case "PERSONALCHAT":
                  deleteAlarmAndNavigateToPersonalChatRoom(
                    item.alarmId,
                    item.targetId
                  ); // 1대1 채팅방 알림일 경우
                  break;
                case "LIKE":
                  deleteAlarmAndNavigateToLikesPage(item.alarmId, item.typeId); // 좋아요 알림일 경우
                  break;
                default:
                  // 기타 알림 유형에 대한 추가적인 처리가 필요한 경우 여기에 코드를 추가합니다.
                  break;
              }
            }}
          >
            {item.description}
          </DropdownItem>
        ))}
        {/* <DropdownItem>
          <Chip size="sm" color="default" variant="flat">
            지난 알림
          </Chip>
        </DropdownItem> */}
        {currentAlarms.map((item, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              console.log("현재알람 왜 안됌?", currentAlarms);
              switch (item.type) {
                case "CLUBJOIN":
                  deleteAlarmAndNavigateForJoinRequest(
                    item.alarmId,
                    item.typeId
                  ); // 클럽 가입 승인 요청 알림일 경우
                  break;
                case "CLUBWAIT":
                  deleteAlarmAndNavigateForApprovalWaiting(
                    item.alarmId,
                    item.typeId
                  ); // 클럽 가입 승인 대기 알림일 경우
                  break;
                case "CLUB":
                  deleteAlarmAndNavigate(item.alarmId, item.targetId); // 클럽 알림일 경우
                  break;
                case "PERSONALCHAT":
                  deleteAlarmAndNavigateToPersonalChatRoom(
                    item.alarmId,
                    item.targetId
                  ); // 1대1 채팅방 알림일 경우
                  break;
                case "LIKE":
                  deleteAlarmAndNavigateToLikesPage(item.alarmId, item.typeId); // 좋아요 알림일 경우
                  break;
                default:
                  // 기타 알림 유형에 대한 추가적인 처리가 필요한 경우 여기에 코드를 추가합니다.
                  break;
              }
            }}
          >
            {item.description}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
export default DropDownNotification;
