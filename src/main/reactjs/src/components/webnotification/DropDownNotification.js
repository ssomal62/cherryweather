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

  useAlarmData({state: alramListState, dynamicPath: ""});
  const alramList = useRecoilValue(alramListState);

  console.log(alramList);
  console.log(alramListState);
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
    <Dropdown isOpen onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
      <DropdownTrigger>
        <span></span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Notifications" color="danger">
        {alramList.map((item, index) => (
          <DropdownItem key={index}>{item.description}</DropdownItem>
        ))}
        {/* <DropdownItem key="login" onClick={() => navigate("/mypage")}>
          {userInfo.name}님이 로그인 되었습니다.
        </DropdownItem>
        <DropdownItem key="weather" onClick={() => navigate("/weatherDetail")}>
          {weatherData
            ? `오늘의 날씨: ${weatherData.weather}, ${weatherData.currentTemp}°C`
            : "날씨 정보를 불러오는 중..."}
        </DropdownItem>
        <DropdownItem key="ai">ai 이미지가 생성되었습니다.</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownNotification;
