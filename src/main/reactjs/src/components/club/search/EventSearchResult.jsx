import React from 'react';
import styled from "styled-components";
import {LuAlertCircle} from "react-icons/lu";

const EventSearchResult = () => {
    return (
        <Section>
            <div style={styles.noData}> <LuAlertCircle/>&nbsp;일치하는 정모가 없습니다</div>
        </Section>
    );
};

export default EventSearchResult;

const Section = styled.div
    `
`
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
