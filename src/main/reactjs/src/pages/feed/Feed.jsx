import React, {useEffect} from 'react';
import FeedCard from "../../components/feed/feedList/FeedCard";
import styled from "styled-components";
import feedData from '../../components/feed/feedList/feedSampleData.json'
import {useRecoilValue} from "recoil";
import {feedListState, useFeedData, useFeedPublicList} from "../../recoil/hooks/UseFeedApi";

const Feed = () => {
    const feedList = useRecoilValue(feedListState);
    useFeedPublicList(); // 커스텀 훅 호출하여 데이터 로드

    return (
        <Section>
            {
                feedList.map((data, index) => (
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
