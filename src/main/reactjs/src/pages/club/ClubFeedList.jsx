import React from 'react';
import Layout from "../../common/Layout";
import FeedCard from "../../components/feed/feedList/FeedCard";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import ClubFeedHeader from "../../components/club/clubFeed/ClubFeedHeader";
import feedData from '../../components/feed/feedList/feedSampleData.json'
const ClubFeedList = () => {

    const {clubId} = useParams();

    return (
        <Layout useHeader={false} containerMargin='20px 40px 100px 40px'>
            <ClubFeedHeader clubId={clubId}/>
            {
                feedData.list.map((data, index) => (
                    <FeedListItemWrapper key={index}>
                        <FeedCard data={data} useParam={clubId} />
                    </FeedListItemWrapper>
                ))
            }
        </Layout>
    );
};

export default ClubFeedList;

const FeedListItemWrapper = styled.div`
  margin-bottom: 25px;
`;
