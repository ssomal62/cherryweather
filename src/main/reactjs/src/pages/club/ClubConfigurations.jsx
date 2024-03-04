import React from 'react';
import Layout from "../../common/Layout";
import styled from "styled-components";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {Chip, Divider} from "@nextui-org/react";
import ClubConfigurationHeader from "../../components/club/clubConfigurations/ClubConfigurationHeader";
import {useRecoilValue} from "recoil";
import {clubDetailState} from "../../recoil/hooks/UseClubApi";
import EditClub from "../../components/club/clubConfigurations/EditClub";
import TransferClub from "../../components/club/clubConfigurations/TransferClub";
import LeaveClub from "../../components/club/clubConfigurations/LeaveClub";
import DeleteClub from "../../components/club/clubConfigurations/DeleteClub";
import ManageClubMembers from "../../components/club/clubConfigurations/ManageClubMembers";
import ReportClub from "../../components/club/clubConfigurations/ReportClub";
import {currentMembershipState, useMembershipData} from "../../recoil/hooks/UseMembershipApi";

const ClubConfigurations = () => {

    const clubDetail = useRecoilValue(clubDetailState).clubDetail;

    useMembershipData({ state: currentMembershipState, dynamicPath:`/${clubDetail.clubId}/member`});
    const myMembership = useRecoilValue(currentMembershipState);
    const myRole = myMembership.info.role;

    return (

        <Layout useHeader={false} useFooter={false} containerMargin="5" containerPadding="0">
            <AnimationRightInWrapper>

                <ClubConfigurationHeader clubDetail={clubDetail}/>
                <Divider/>

                {
                    (myRole === "HOST" || myRole === "MODERATOR") &&
                    <>
                        <Section>
                            <Chip size='sm' color='default' variant='faded'> 클럽 정보 </Chip>
                            <EditClub clubDetail={clubDetail}/>
                        </Section>
                        <Divider/>
                    </>
                }
                {
                    (myRole === "HOST" || myRole === "MODERATOR" || myRole === "MEMBER") &&
                    <>
                        <Section>
                            <Chip size='sm' color='default' variant='faded'> 클럽 활동 </Chip>
                            <ManageClubMembers clubDetail={clubDetail}/>
                        </Section>
                        <Divider/>
                    </>
                }
                <Section>
                    <Chip size='sm' color='default' variant='faded'> 클럽 운영 </Chip>

                    {
                        (myRole === "MODERATOR" || myRole === "MEMBER") &&
                        <LeaveClub message="탈퇴하기" clubDetail={clubDetail} myMembership={myMembership}/>
                    }
                    {
                        myRole === "WAITING" &&
                        <LeaveClub message="대기취소" clubDetail={clubDetail} myMembership={myMembership}/>
                    }
                    {
                        myRole === "HOST" &&
                        <>
                            <TransferClub/>
                            <DeleteClub/>
                        </>
                    }
                </Section>
                <Divider/>
                {myRole !== "HOST" &&
                    <>
                        <Section>
                            <Chip size='sm' color='default' variant='faded'> 클럽 신고 </Chip>
                            <ReportClub/>
                        </Section>
                        <Divider/>
                    </>
                }

            </AnimationRightInWrapper>
        </Layout>

    );
};

export default ClubConfigurations;

const Section = styled.div`
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 5%;
  display: block;
  width: 100%;
`;
