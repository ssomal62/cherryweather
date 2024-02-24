import React from "react";
import CardListItem from "./ClubListItem";
import styled from "styled-components"
import {Spinner} from "@nextui-org/react";
import {useRecoilValue} from "recoil";
import {clubListState, useClubData} from "../../../recoil/hooks/UseClubApi";


const ClubList = () => {

    const {loading: loadingClubData} = useClubData({ state: clubListState, dynamicPath: ''});

    const clubList = useRecoilValue(clubListState);

    const loading = loadingClubData;

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                <Spinner size="lg" color="danger"/>
            </div>
        );
    }

    return (
        <div>
            {clubList.map((club) => (
                <CardListItemWrapper key={club.clubId}>
                    <CardListItem club={club}/>
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
