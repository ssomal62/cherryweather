import React, {useEffect} from 'react';
import Layout from "../../common/Layout";
import MembersTable from "../../components/club/clubMembers/MembersTable";
import ClubMembersHeader from "../../components/club/clubMembers/ClubMembersHeader";
import {Divider} from "@nextui-org/react";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {useRecoilValue} from "recoil";
import {membersState, useMembersState} from "../../recoil/hooks/UseMembersState";
import {clubDetailState} from "../../recoil/hooks/UseClubDetailState";

const ClubMembers = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const club = useRecoilValue(clubDetailState);

    useMembersState(club.clubId);

    const members = useRecoilValue(membersState);

    return (
        <Layout useHeader={false} useFooter={false} containerMargin="5" containerPadding="0">
            <AnimationRightInWrapper>
                <ClubMembersHeader/>
                <Divider/>
                <MembersTable users = {members}/>
            </AnimationRightInWrapper>
        </Layout>
    );
};

export default ClubMembers;
