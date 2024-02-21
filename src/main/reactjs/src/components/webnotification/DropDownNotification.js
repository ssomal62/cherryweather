// DropDownNotification.js

import React, { useEffect, useRef, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  useFetchUserInfo,
  userInfoState,
} from "../../recoil/hooks/UseFetchUserInfo";
import { clubListState, useFetchClubs } from "../../recoil/hooks/UseFetchClubs";
import { useNavigate } from "react-router-dom";
import { UseFetchWeather } from "../../recoil/hooks/UseFetchWeather";

const DropDownNotification = () => {
  const userInfo = useRecoilValue(userInfoState);
  const [clubs, setClubs] = useRecoilState(clubListState); // clubs Recoil 상태 사용하기
  const fetchClubs = useFetchClubs(); // 클럽 정보 가져오기
  const userInfoFetch = useFetchUserInfo();
  const navigate = useNavigate(); // useNavigate 훅 사용하기
  const { data: weatherData } = UseFetchWeather('/weather/daily'); // 날씨 데이터 가져오기

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    userInfoFetch();
  }, []);

  // 클럽 데이터를 가져오는 부분을 수정합니다.
  useEffect(() => {
    async function loadClubs() {
      try {
        const clubsData = await fetchClubs(); // 클럽 데이터를 가져옴
        if (clubsData) {
          setClubs(clubsData); // Recoil 상태를 업데이트
        } else {
          console.error('클럽 데이터를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('클럽 데이터를 가져오는 중 에러가 발생했습니다.', error);
      }
    }

    if (userInfo.name && userInfo.clubId) {
      loadClubs(); // 유저 정보가 있고, clubId도 있을 때 클럽 정보 가져오기
    }
  }, [fetchClubs, userInfo.name, userInfo.clubId]); // 의존성 배열에 userInfo.clubId 추가

  // 클럽 정보를 비교하여 필터링
  const userClubs = clubs ? clubs.filter(
    (club) => userInfo.clubId && userInfo.clubId.includes(club.clubId)
  ) : [];
  console.log(userInfo.clubId);

  console.log(clubs);

  // DropdownItem 생성 부분을 수정합니다.
  const clubDropdownItems = userClubs.length > 0 ? userClubs.map((club) => (
    <DropdownItem
      key={club.clubId}
      textValue={`${club.name}모임이 생성되었습니다.`}
    >
      {club.name}모임이 생성되었습니다.
    </DropdownItem>
  )) : <DropdownItem>가입한 모임이 없습니다.</DropdownItem>; // 클럽이 없을 경우를 대비한 대체 텍스트

  console.log(clubDropdownItems);

  const handleClickOutside = (event) => {
    if (
      isOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // isOpen을 의존성 배열에서 제거하여 한 번만 실행되도록 함

  return (
    <Dropdown isOpen onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
      <DropdownTrigger>
        <span></span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Notifications" color="danger">
        <DropdownItem key="login" onClick={() => navigate("/mypage")}>
          {userInfo.name}님이 로그인 되었습니다.
        </DropdownItem>
        <DropdownItem key="weather">오늘의 날씨: {weatherData.weather}, {weatherData.currentTemp}°C</DropdownItem>
        {clubDropdownItems} {/* clubDropdownItems 배열을 그대로 사용 */}
        {/* {clubs
          .filter((club) => userClubNames.includes(club.name))
          .map((club) => (
            <DropdownItem key={club.id}>
              {club.name}모임이 생성되었습니다.
            </DropdownItem>
          ))} */}
        <DropdownItem key="room">새로운 정모가 개설 되었습니다.</DropdownItem>
        <DropdownItem key="chat">설정 변경</DropdownItem>
        <DropdownItem key="ai">ai 이미지가 생성되었습니다.</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownNotification;
