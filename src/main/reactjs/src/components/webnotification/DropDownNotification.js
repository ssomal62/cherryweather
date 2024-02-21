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
import {clubListState, useFetchClubs} from "../../recoil/hooks/UseFetchClubs";
import {useNavigate} from "react-router-dom";

const DropDownNotification = () => {
  const userInfo = useRecoilValue(userInfoState);
  const clubs = useRecoilValue(clubListState); // clubs Recoil 상태 사용하기
  const fetchClubs = useFetchClubs(); // 클럽 정보 가져오기
  const userInfoFetch = useFetchUserInfo();
  const navigate = useNavigate(); // useNavigate 훅 사용하기

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    userInfoFetch();
  }, []);

  // userInfo 상태가 업데이트될 때마다 클럽 정보를 가져옴
  useEffect(() => {
    if (userInfo.name) {
      fetchClubs(); // userInfo.name이 변경될 때마다 fetchClubs 호출
    }
  }, [fetchClubs, userInfo.name]);

  // 클럽 정보를 비교하여 필터링
  const userClubs = clubs.filter(
    (club) => userInfo.clubId && userInfo.clubId.includes(club.clubId)
  );
  console.log(userInfo.clubId);

  console.log(clubs);

  // 필터링된 클럽으로 DropdownItem 생성
  const clubDropdownItems = userClubs.map((club) => (
    <DropdownItem
      key={club.clubId}
      textValue={`${club.name}모임이 생성되었습니다.`}
    >
      {club.name}모임이 생성되었습니다.
    </DropdownItem>
  ));

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
        <DropdownItem key="weather">오늘의 날씨: 맑음, 20°C</DropdownItem>
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
