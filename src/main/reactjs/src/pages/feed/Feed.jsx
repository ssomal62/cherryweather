import React from 'react';
import FeedCard from "../../components/feed/feedList/FeedCard";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {feedListState, useFeedData} from "../../recoil/hooks/UseFeedApi";
import {Spinner} from "@nextui-org/react";
import {useParams} from "react-router-dom";

const Feed = () => {
    const {clubId} = useParams();
    const {loading : loadingFeedData} =
        useFeedData({state: feedListState, dynamicPath: ""})

    const feedList = useRecoilValue(feedListState);

    if (loadingFeedData) {
        return (
            <Section>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                    <Spinner size="lg" color="danger"/>
                </div>
            </Section>
        );
    }
    return (
        <Section>
            {
                feedList.map((data, index) => (
                    <FeedListItemWrapper key={index}>
                        <FeedCard data={data} useParam={clubId}/>
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
