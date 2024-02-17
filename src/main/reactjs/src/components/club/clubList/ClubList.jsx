import React, {useEffect} from "react";
import CardListItem from "./ClubListItem";
import {useRecoilValue} from "recoil";
import {clubListState, useFetchClubs} from "../../../recoil/hooks/UseFetchClubs";
import styled from "styled-components"


const ClubList = () => {

    const fetchClubs = useFetchClubs(); // 함수를 담는것, 아래의 변수에 값을 넣기 위해 선행되는 행위,
    const clubs = useRecoilValue(clubListState); // 실제로 값이 저장되어 있는 변수,

    useEffect(() => {
        fetchClubs();
    }, [fetchClubs]);

    return (
        <div>
            {clubs.map((club) => (
                <CardListItemWrapper key={club.clubId}>
                    <CardListItem
                        club={club}
                    />
                </CardListItemWrapper>
            ))}
        </div>
    )
        ;
}

export default ClubList;

const CardListItemWrapper = styled.div`
  margin-bottom: 25px;
`;
