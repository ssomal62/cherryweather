import React from 'react';
import FeedCard from "../../components/feed/feedList/FeedCard";
import styled from "styled-components";
import feedData from '../../components/feed/feedList/feedSampleData.json'

const Feed = () => {

    return (
        <Section>
            {
                feedData.list.map((data, index) => (
                    <FeedListItemWrapper key={index}>
                        <FeedCard data={data}/>
                    </FeedListItemWrapper>
                ))
            }
            <div style={{paddingBottom: '80px'}}/>
        </Section>
    );
};
export default Feed;

const FeedListItemWrapper = styled.div`
  margin-bottom: 25px;
`;

const Section = styled.div`
    margin: 0;
`
