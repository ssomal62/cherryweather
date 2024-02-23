import React, {useEffect, useState} from 'react';
import Layout from "../../common/Layout";
import {useParams} from "react-router-dom";
import SoftCurveTop from "../../components/club/clubDetail/SoftCurveTop";

import {Image, Spinner} from "@nextui-org/react";
import styled from "styled-components";
import ClubDetailsHeader from "../../components/club/clubDetail/ClubDetailsHeader";
import {clubDetailState, useClubDetailState} from "../../recoil/hooks/UseClubDetailState";
import {useRecoilValue} from "recoil";
import ClubJoinButton from "../../components/club/clubDetail/ClubJoinButton";
import {useMembersState} from "../../recoil/hooks/UseMembersState";
import {useCheckMember} from "../../recoil/hooks/CheckIsMember";
import ClubDetailsSummary from "../../components/club/clubDetail/ClubDetailsSummary";
import ClubNotice from "../../components/club/clubDetail/ClubNotice";
import EventSection from "../../components/club/clubDetail/EventSection";
import MemberSummary from "../../components/club/clubDetail/MemberSummary";
import ClubFeed from "../../components/club/clubDetail/ClubFeed";
import ClubCategory from "../../components/club/clubDetail/ClubCategory";
import ClubName from "../../components/club/clubDetail/ClubName";
import LoginVerificationModal from "../../utils/LoginVerificationModal";

const ClubDetails = () => {

    const {clubId} = useParams();

    const loadingCheckMember = useCheckMember(clubId).loading
    const loadingClubDetail = useClubDetailState(clubId).loading;
    const loadingMembersState = useMembersState(clubId).loading;

    const club = useRecoilValue(clubDetailState);

    const loading = loadingCheckMember || loadingClubDetail || loadingMembersState;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [offsetY, setOffsetY] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const clubProfile = (code) => {
        if (code === '') {
            return `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/club-profile/defalut.jpg?type=f&w=600&h=600&ttype=jpg`
        }
        return `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/club-profile/${code}.jpg?type=f&w=600&h=600&ttype=jpg`
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
                <ClubDetailsHeader/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <Spinner size="lg" color="danger"/>
                </div>
            </Layout>
        );
    }

    return (
        <Layout useHeader={false} useFooter={false} containerMargin="0" containerPadding="0">
            <ClubDetailsHeader/>
            <ClubDetail>
                <div style={styles.aspectRatio}>
                    <Content>
                        <ClubCategory clubDetail={club.clubDetail}/>
                        <ClubName clubDetail={club.clubDetail}/>
                        <ClubDetailsSummary clubDetail={club.clubDetail}/>
                        <EventSection />
                        <ClubNotice clubDetail={club.clubDetail}/>
                        <MemberSummary/>
                        <ClubFeed/>
                    </Content>

                    <Image radius='none' alt=""
                           removeWrapper
                           style={{
                               ...styles.img,
                               transform: `translateY(${offsetY * -0.3}px)`,
                           }}
                           className="w-full object-cover object-middle"
                           src={clubProfile(club.clubDetail.code)}
                    />
                    <div style={styles.top}>
                        <SoftCurveTop color={'#ffffff'}/>
                    </div>
                </div>
            </ClubDetail>

            <ClubJoinButton clubId={clubId}/>
            <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
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
  min-height: 650%;
  background-image: linear-gradient(to bottom, #ffffff, #ffffff, #CFD8F2, #ffffff);
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
