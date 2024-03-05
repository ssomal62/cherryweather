import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import SoftCurveTop from "../../components/club/clubDetail/SoftCurveTop";

import {Image, Spinner} from "@nextui-org/react";
import styled from "styled-components";
import ClubDetailsHeader from "../../components/club/clubDetail/ClubDetailsHeader";
import {clubDetailState, useClubData} from "../../recoil/hooks/UseClubApi";
import {useRecoilValue} from "recoil";
import ClubJoinButton from "../../components/club/clubDetail/ClubJoinButton";
import ClubDetailsSummary from "../../components/club/clubDetail/ClubDetailsSummary";
import ClubNotice from "../../components/club/clubDetail/ClubNotice";
import EventSection from "../../components/club/clubDetail/EventSection";
import MemberSummary from "../../components/club/clubDetail/MemberSummary";
import ClubFeedSlide from "../../components/club/clubDetail/ClubFeedSlide";
import ClubCategory from "../../components/club/clubDetail/ClubCategory";
import ClubName from "../../components/club/clubDetail/ClubName";
import LoginVerificationModal from "../../utils/LoginVerificationModal";
import {IsLoginAtom} from "../../recoil/LoginAtom";
import {
    currentClubMembershipInfoState,
    currentMembershipState,
    useMembershipData
} from "../../recoil/hooks/UseMembershipApi";
import ClubTag from "../../components/club/clubDetail/ClubTag";
import GrowthMeter from "../../components/club/clubDetail/GrowthMeter";
import {feedClubListState, useFeedData} from "../../recoil/hooks/UseFeedApi";

const ClubDetails = () => {

    const {clubId} = useParams();
    const isLogin = useRecoilValue(IsLoginAtom);

    const {loading: loadingClubMembershipData} =
        useMembershipData({ state: currentClubMembershipInfoState, dynamicPath:`/${clubId}/memberships`});

    const {loading: loadingMyMembership} =
        useMembershipData({ state: currentMembershipState, dynamicPath:`/${clubId}/member`});

    const {loading: loadingClubData} =
        useClubData({ state: clubDetailState, dynamicPath:`/${clubId}`});

    const {loading: loadingFeedData} = useFeedData({state: feedClubListState, dynamicPath :  `/club/${clubId}`})

    const loading = loadingMyMembership || loadingClubData || loadingClubMembershipData || loadingFeedData;

    const clubDetailAll= useRecoilValue(clubDetailState);
    const clubFeedData = useRecoilValue(feedClubListState);

    const clubDetail = clubDetailAll.clubDetail;
    const hostName = clubDetailAll.hostName;
    const hostProfile = clubDetailAll.hostProfile;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [offsetY, setOffsetY] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const clubProfile = (code) => {
        return `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/club-profile/${code ? code : "default"}.jpg?type=f&w=600&h=600&ttype=jpg`
    }
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    const handleBack = () => {
        navigate(from);
    }

    useEffect(() => {
        let lastScrollY = 0;
        let ticking = false;

        const handleScroll = () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setOffsetY(lastScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) {
        return (
            <Layout useHeader={false} useFooter={false} containerMargin="0" containerPadding="0">
                <ClubDetailsHeader clubDetail={clubDetail} isLogin={isLogin} handleBack={handleBack}/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <Spinner size="lg" color="danger"/>
                </div>
            </Layout>
        );
    }

    return (
        <Layout useHeader={false} useFooter={false} containerMargin="0 0 100px 0" containerPadding="0 0 100px 0">
            <ClubDetailsHeader clubDetail={clubDetail} isLogin={isLogin} handleBack={handleBack}/>
            <ClubDetail>
                <div style={styles.aspectRatio}>
                    <Content>
                        <ClubCategory clubDetail={clubDetail}/>
                        <ClubName clubDetail={clubDetail}/>
                        <ClubDetailsSummary clubDetail={clubDetail}/>
                        <EventSection />
                        <ClubNotice clubDetail={clubDetail} hostName={hostName} hostProfile={hostProfile}/>
                        <MemberSummary isLogin={isLogin} clubDetail={clubDetail}/>
                        <ClubFeedSlide isLogin={isLogin} clubFeedData={clubFeedData} clubDetail={clubDetail}/>
                        <ClubTag clubDetail={clubDetail}/>
                        <GrowthMeter clubDetail={clubDetail}/>
                    </Content>

          <Image
            radius="none"
            alt=""
            removeWrapper
            style={{
              ...styles.img,
              transform: `translateY(${offsetY * -0.3}px)`,
            }}
            className="w-full object-cover object-middle"
            src={clubProfile(clubDetail.code)}
          />
          <div style={styles.top}>
            <SoftCurveTop color={"#ffffff"} />
          </div>
        </div>
      </ClubDetail>
      <ClubJoinButton clubId={clubId} />
      <LoginVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export default ClubDetails;

const bd = '0px solid aquamarine';

const Content = styled.div`
  border: ${bd};
  position: absolute;
  justify-content: center;
  top: 0;
  height: auto;
  padding-bottom: 100px;
  margin-top: 69%;
  left: 0;
  max-width: 600px;
  width: 100%;
  z-index: 30;
  display: flex;
  flex-direction: column;
`;

const ClubDetail = styled.div`
  width: 100%;
  min-height: 600%;
  border: ${bd};
  background-image: linear-gradient(to bottom, #ffffff, #ffffff, #F0F0F0, #ffffff);
  overflow-x: hidden;
`;

const styles = {
    aspectRatio: {
        position  : 'relative',
        width     : '100%',
        paddingTop: '90%',
    },
    img        : {
        position: 'absolute',
        top     : 0,
        left    : 0,
        width   : '100%',
        height  : '100%',
        //maskImage: 'linear-gradient(to top, transparent, black)',
    },
    top     : {
        position  : 'absolute',
        top       : '0',
        width     : '100%',
        height    : '100%',
        paddingTop: '50%',
        zIndex    : '10',
    }
}
