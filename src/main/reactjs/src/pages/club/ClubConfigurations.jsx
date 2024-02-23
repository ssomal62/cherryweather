import React from 'react';
import Layout from "../../common/Layout";
import styled from "styled-components";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {Chip, Divider} from "@nextui-org/react";
import ClubConfigurationHeader from "../../components/club/clubConfigurations/ClubConfigurationHeader";
import {useRecoilValue} from "recoil";
import {clubDetailState} from "../../recoil/hooks/UseClubDetailState";
import EditClub from "../../components/club/clubConfigurations/EditClub";
import TransferClub from "../../components/club/clubConfigurations/TransferClub";
import LeaveClub from "../../components/club/clubConfigurations/LeaveClub";
import DeleteClub from "../../components/club/clubConfigurations/DeleteClub";
import ManageClubMembers from "../../components/club/clubConfigurations/ManageClubMembers";
import ReportClub from "../../components/club/clubConfigurations/ReportClub";
import {memberInfoState} from "../../recoil/hooks/CheckIsMember";

const ClubConfigurations = () => {

    const club = useRecoilValue(clubDetailState);
    const membership = useRecoilValue(memberInfoState);

    return (

        <Layout useHeader={false} useFooter={false} containerMargin="5" containerPadding="0">
            <AnimationRightInWrapper>

                <ClubConfigurationHeader/>
                <Divider/>

                {
                    (membership.role === "HOST" || membership.role === "MODERATOR") &&
                    <>
                        <Section>
                            <Chip size='sm' color='default' variant='faded'> 클럽 정보 </Chip>
                            <EditClub clubDetail={club.clubDetail}/>
                        </Section>
                        <Divider/>
                    </>
                }
                {
                    (membership.role === "HOST" || membership.role === "MODERATOR" || membership.role === "MEMBER") &&
                    <>
                        <Section>
                            <Chip size='sm' color='default' variant='faded'> 클럽 활동 </Chip>
                            <ManageClubMembers/>
                        </Section>
                        <Divider/>
                    </>
                }
                <Section>
                    <Chip size='sm' color='default' variant='faded'> 클럽 운영 </Chip>

                    {
                        (membership.role === "MODERATOR" || membership.role === "MEMBER") &&
                        <LeaveClub message="탈퇴하기"/>
                    }
                    {
                        membership.role === "WAITING" &&
                        <LeaveClub message="대기취소"/>
                    }
                    {
                        membership.role === "HOST" &&
                        <>
                            <TransferClub/>
                            <DeleteClub/>
                        </>
                    }
                </Section>
                <Divider/>
                {membership.role !== "HOST" &&
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
