import React, {useEffect} from "react";
import CardListItem from "./ClubListItem";
import {useRecoilValue} from "recoil";
import {clubListState, useFetchClubs} from "../../../recoil/hooks/UseFetchClubs";
import styled from "styled-components"
import ClubListTabs from "./ClubListTabs";


const ClubList = () => {

    const fetchClubs = useFetchClubs();
    const clubs = useRecoilValue(clubListState);

    useEffect(() => {
        fetchClubs();
    }, [fetchClubs]);

    return (
        <div>
            <ClubListTabs/>
            {clubs.map((club) => (
                <CardListItemWrapper key={club.clubId}>
                    <CardListItem
                        club={club}
                    />
                </CardListItemWrapper>
            ))}
            <br/><br/><br/>
        </div>
    )
        ;
}

export default ClubList;

const CardListItemWrapper = styled.div`
  margin-bottom: 25px;
`;
