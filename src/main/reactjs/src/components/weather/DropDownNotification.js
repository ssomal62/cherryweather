// DropDownNotification.js

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {useRecoilValue} from "recoil";
import {userInfoState} from "../../recoil/hooks/UseFetchUserInfo";
import {clubListState, useFetchClubs} from "../../recoil/hooks/UseFetchClubs";

const DropDownNotification = () => {
  const userInfo = useRecoilValue(userInfoState);
  const clubs = useRecoilValue(clubListState); // clubs Recoil 상태 사용하기
  const fetchClubs = useFetchClubs(); // 클럽 정보 가져오기

  // 현재 로그인한 사용자가 생성한 클럽 이름 추출
  const userClubNames = React.useMemo(
    () => (userInfo.clubs ? userInfo.clubs.map((club) => club.name) : []),
    [userInfo.clubs]
  );

  // userInfo 상태가 바뀔 때마다 clubs를 필터링
  React.useEffect(() => {
    if (userInfo.name) {
      fetchClubs();
    }
  }, [fetchClubs, userInfo]);

  // 필터링된 클럽으로 알림을 표시
  const filteredClubs = clubs.filter((club) =>
    userClubNames.includes(club.name)
  );

  // 필터링된 클럽으로 DropdownItem 생성
  const clubDropdownItems = filteredClubs.map((club) => (
    <DropdownItem
      key={club.id}
      textValue={`${club.name}모임이 생성되었습니다.`}
    >
      {club.name}모임이 생성되었습니다.
    </DropdownItem>
  ));
  return (
    <Dropdown isOpen>
      <DropdownTrigger>
        <span></span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Notifications" color="danger">
        <DropdownItem key="login">
          {userInfo.name}님의 로그인을 축하드립니다.
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
