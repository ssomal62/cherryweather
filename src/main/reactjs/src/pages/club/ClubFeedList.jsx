import React from 'react';
import Layout from "../../common/Layout";
import FeedCard from "../../components/feed/feedList/FeedCard";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import ClubFeedHeader from "../../components/club/clubFeed/ClubFeedHeader";
import {useRecoilValue} from "recoil";
import {feedClubListState, useFeedData} from "../../recoil/hooks/UseFeedApi";
import {Button, Spinner} from "@nextui-org/react";
import {LuAlertCircle} from "react-icons/lu";
import {IsLoginAtom} from "../../recoil/LoginAtom";

const ClubFeedList = () => {

    const {clubId} = useParams();
    const isLogin = useRecoilValue(IsLoginAtom);
    const navigate = useNavigate();
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
                feedClubList.length === 0 ? (
                        <div className="flex flex-col justify-center items-center text-small text-stone-400 h-[50vh]">
                            <div className="flex flex-row items-center"><LuAlertCircle/>&nbsp;아직 피드가 없네요</div>
                            {
                                isLogin &&
                                <Button variant="light" color="danger"
                                        onClick={() => navigate('/feed-editor')}
                                ><u>피드 작성하기</u></Button>
                            }
                        </div>
                    )
                    :
                    (
                feedClubList.map((data, index) => (
                    <FeedListItemWrapper key={index}>
                        <FeedCard data={data} useParam={clubId} />
                    </FeedListItemWrapper>
                ))
                    )
            }
        </Layout>
    );
};

export default ClubFeedList;

const FeedListItemWrapper = styled.div`
  margin-bottom: 25px;
`;
