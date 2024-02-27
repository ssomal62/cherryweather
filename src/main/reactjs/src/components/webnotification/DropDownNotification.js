// DropDownNotification.js

import React, {useEffect, useRef, useState} from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {useRecoilValue} from "recoil";
import {
  useFetchUserInfo,
  userInfoState,
} from "../../recoil/hooks/UseFetchUserInfo";
import {useNavigate} from "react-router-dom";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {alramListState, useAlarmData} from "../../recoil/hooks/UseAlramApi";

const DropDownNotification = () => {
  const userInfo = useRecoilValue(userInfoState);
  const userInfoFetch = useFetchUserInfo();
  const navigate = useNavigate(); // useNavigate 훅 사용하기
  const {fetchData, data: weatherData} = UseFetchWeather("/weather/daily"); // 날씨 데이터 가져오기

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchData();
    userInfoFetch();
  }, []);

  useEffect(() => {
    // 알림 수신 동의가 false 일 경우 드롭다운을 닫는다.
    setIsOpen(userInfo.agreementGetNotified);
  }, [userInfo.agreementGetNotified]);

  useAlarmData({state: alramListState, dynamicPath: ""});
  const alramList = useRecoilValue(alramListState);

  // 새로운 배열을 만들어서 작업합니다.
  const sortedAlramList = [...alramList].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const displayedAlramList = sortedAlramList.slice(0, 5);

  useEffect(() => {
    if (weatherData && isOpen) {
      console.log(
        `오늘의 날씨: ${weatherData.weather}, 현재 온도: ${weatherData.currentTemp}°C`
      );
      // 여기에 사용자에게 날씨 정보를 알림으로 띄우는 기능을 추가합니다.
      // 예: alert(`오늘의 날씨: ${weatherData.weather}, 현재 온도: ${weatherData.currentTemp}°C`);
    }
  }, [weatherData, isOpen]); // weatherData만 의존성 배열에 추가

  return (
    <Dropdown
      isOpen={isOpen}
      onClick={() => {
        if (userInfo.agreementGetNotified) {
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
        {displayedAlramList.map((item, index) => (
          <DropdownItem
            key={index}
            onClick={() => navigate(`/club-details/${item.targetId}`)}
          >
            {item.description}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownNotification;
