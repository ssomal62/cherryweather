import React, {useEffect} from "react";
import CardListItem from "./ClubListItem";
import {useRecoilValue} from "recoil";
import {clubListState, useFetchClubs} from "../../../recoil/hooks/UseFetchClubs";
import styled from "styled-components"
import {Spinner} from "@nextui-org/react";
import {useMyMembership} from "../../../recoil/hooks/UseMyMembership";


const ClubList = () => {

    const clubs = useRecoilValue(clubListState);

    useMyMembership();

    const {fetchClubs, loading} = useFetchClubs();

    useEffect(() => {
        fetchClubs();
    }, [fetchClubs]);

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                <Spinner size="lg" color="danger"/>
            </div>
        );
    }

    return (
        <div>
            {clubs.map((club) => (
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
