// DropDownNotification.js

import React, {useEffect, useMemo, useRef, useState} from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {useRecoilState, useRecoilValue} from "recoil";
import {
  useFetchUserInfo,
  userInfoState,
} from "../../recoil/hooks/UseFetchUserInfo";
import {clubListState, useFetchClubs} from "../../recoil/hooks/UseFetchClubs";
import {useNavigate} from "react-router-dom";
import {UseFetchWeather} from "../../recoil/hooks/UseFetchWeather";

const DropDownNotification = () => {
  const userInfo = useRecoilValue(userInfoState);
  const [clubs, setClubs] = useRecoilState(clubListState); // clubs Recoil 상태 사용하기
  const fetchClubs = useFetchClubs(); // 클럽 정보 가져오기
  const userInfoFetch = useFetchUserInfo();
  const navigate = useNavigate(); // useNavigate 훅 사용하기
  const {fetchData, data: weatherData} = UseFetchWeather("/weather/daily"); // 날씨 데이터 가져오기

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
  // 클럽 데이터를 가져오는 부분을 수정합니다.
  useEffect(() => {
    async function loadClubs() {
      try {
        const clubsData = await fetchClubs(); // 클럽 데이터를 가져옴
        if (clubsData) {
          setClubs(clubsData); // Recoil 상태를 업데이트
        } else {
          console.error("클럽 데이터를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("클럽 데이터를 가져오는 중 에러가 발생했습니다.", error);
      }
    }

    if (userInfo.name && userInfo.clubId) {
      loadClubs(); // 유저 정보가 있고, clubId도 있을 때 클럽 정보 가져오기
    }
  }, [fetchClubs, userInfo.name, userInfo.clubId, setClubs]); // 의존성 배열에 userInfo.clubId 추가

  console.log("사용자의 이름:", userInfo.name);
  console.log("사용자가 속한 클럽Id:", userInfo.clubId);

  // 클럽 정보를 비교하여 필터링
  // userInfo.clubId가 유효할 때만 필터링을 진행합니다.
  // const userClubs =
  //   userInfo.clubId && clubs
  //     ? clubs.filter((club) => club.clubId === userInfo.clubId)
  //     : [];
  // 필터링 로직을 수정합니다.
  const userClubName = clubs.find(
    (club) => club.clubId === userInfo.clubId
  )?.name;

  console.log("사용자 클럽 정보 :", userClubName);
  console.log(userInfo.clubId);

  console.log(clubs);

  // 드롭다운 아이템을 생성합니다.
  const clubDropdownItem = userClubName ? (
    <DropdownItem key={userInfo.clubId}>
      {userClubName} 모임이 생성되었습니다.
    </DropdownItem>
  ) : (
    <DropdownItem>가입한 모임이 없습니다.</DropdownItem>
  );

  // console.log("드롭다운 아이템 :", clubDropdownItems);

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
        {/* {clubs.length > 0 ? (
          clubs.map((club) => (
            <DropdownItem key={club.clubId}>
              {club.name} 모임이 생성되었습니다.
            </DropdownItem>
          ))
        ) : (
          <DropdownItem>가입한 모임이 없습니다.</DropdownItem>
        )} */}
        {clubDropdownItem}
        <DropdownItem key="room">새로운 정모가 개설 되었습니다.</DropdownItem>
        <DropdownItem key="chat">설정 변경</DropdownItem>
        <DropdownItem key="ai">ai 이미지가 생성되었습니다.</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownNotification;
