import React, {useEffect} from "react";
import CardListItem from "./ImageList";
import {useRecoilValue} from "recoil";
import {useFetchClubs} from "../../../recoil/hooks/UseFetchClubs";
import {clubListState} from "../../../recoil/hooks/UseFetchClubs";
import styled from "styled-components"


const ImageList = () => {

    const fetchClubs = useFetchClubs();
    const clubs = useRecoilValue(clubListState);

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

export default ImageList;

const CardListItemWrapper = styled.div`
  margin-bottom: 25px;
`;
