// DropDownNotification.js

import React, {useEffect, useMemo, useRef, useState} from "react";
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
import {useFetchClubs} from "../../recoil/hooks/UseFetchClubs";
import {useNavigate} from "react-router-dom";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";
import {useClubDetailState} from "../../recoil/hooks/UseClubDetailState";
import {useMyMembership} from "../../recoil/hooks/UseMyMembership";
import {useMembersState} from "../../recoil/hooks/UseMembersState";

const DropDownNotification = () => {
  const userInfo = useRecoilValue(userInfoState);
  const fetchClubs = useFetchClubs(); // 클럽 정보 가져오기
  const userInfoFetch = useFetchUserInfo();
  const navigate = useNavigate(); // useNavigate 훅 사용하기
  const {fetchData, data: weatherData} = UseFetchWeather("/weather/daily"); // 날씨 데이터 가져오기
  const getClubDetail = useClubDetailState(userInfo.clubId);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // 사용자의 멤버십 정보를 가져옴
  const userMembership = useMyMembership();
  // 클럽 멤버십 정보를 상태로 관리
  const clubMembers = useMembersState(userInfo.clubId);

  // 클럽 이름을 찾아내는 함수
  const findUserClubName = () => {
    if (clubMembers && userInfo.accountId) {
      const userClub = clubMembers.find(
        (member) => member.accountId === userInfo.accountId
      );
      return userClub ? userClub.clubName : null;
    }
    return null;
  };

  useEffect(() => {
    if (userInfo.clubId) {
      const userClubName = findUserClubName();
      if (userClubName) {
        console.log("사용자가 속한 클럽 이름:", userClubName);
      } else {
        console.log("사용자가 속한 클럽을 찾을 수 없습니다.");
      }
    } else {
      console.log("사용자가 클럽에 속해 있지 않습니다.");
    }
  }, [userInfo, clubMembers]);

  useEffect(() => {
    fetchData();
    fetchClubs(); // 클럽 정보 가져오기
    userInfoFetch();
  }, [fetchData, fetchClubs, userInfoFetch]);

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
        <DropdownItem key="login" onClick={() => navigate("/mypage")}>
          {userInfo.name}님이 로그인 되었습니다.
        </DropdownItem>
        <DropdownItem key="weather" onClick={() => navigate("/weatherDetail")}>
          {weatherData
            ? `오늘의 날씨: ${weatherData.weather}, ${weatherData.currentTemp}°C`
            : "날씨 정보를 불러오는 중..."}
        </DropdownItem>
        <DropdownItem>
          {userMembership
            ? `${findUserClubName()} 모임이 생성되었습니다.`
            : "가입한 모임이 없습니다."}
        </DropdownItem>
        <DropdownItem key="room">새로운 정모가 개설 되었습니다.</DropdownItem>
        <DropdownItem key="chat">설정 변경</DropdownItem>
        <DropdownItem key="ai">ai 이미지가 생성되었습니다.</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownNotification;
