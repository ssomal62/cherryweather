import React from 'react';
import Layout from "../../common/Layout";
import FeedCard from "../../components/feed/feedList/FeedCard";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import ClubFeedHeader from "../../components/club/clubFeed/ClubFeedHeader";
import {useRecoilValue} from "recoil";
import {feedClubListState, useFeedData} from "../../recoil/hooks/UseFeedApi";
import {Spinner} from "@nextui-org/react";

const ClubFeedList = () => {

    const {clubId} = useParams();

    const {loading : loadingFeedData} =
        useFeedData({state: feedClubListState, dynamicPath: `/${clubId}`})

    const feedClubList = useRecoilValue(feedClubListState);


    if (loadingFeedData) {
        return (
            <Layout useHeader={false} containerMargin='20px 40px 100px 40px'>
                <ClubFeedHeader clubId={clubId}/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                    <Spinner size="lg" color="danger"/>
                </div>
            </Layout>
        );
    }
    return (
        <Layout useHeader={false} containerMargin='20px 40px 100px 40px'>
            <ClubFeedHeader clubId={clubId}/>
            {
                feedClubList.map((data, index) => (
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
