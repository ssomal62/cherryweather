import React from 'react';
import styled from "styled-components";
import CardListItem from "../clubList/ClubListItem";
import {LuAlertCircle} from "react-icons/lu";

const ClubSearchResult = ({clubList}) => {

    return (
        <Section>
            {
                clubList.length === 0 ?
                    (<div style={styles.noData}> <LuAlertCircle/>&nbsp;일치하는 클럽이 없습니다</div>)
                    :
                    (
                        <>
                            {clubList.map((club) => (
                                <CardListItemWrapper key={club.clubId}>
                                    <CardListItem club={club}/>
                                </CardListItemWrapper>
                            ))}
                        </>
                    )
            }
            <br/><br/><br/>
        </Section>
    );
};

export default ClubSearchResult;

const Section = styled.div
    `
`
const CardListItemWrapper = styled.div`
  margin-bottom: 25px;
`;

const styles = {
    noData: {
        color: 'gray',
        margin: 'auto',
        fontSize: 'small',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '60vh',
    }
}
