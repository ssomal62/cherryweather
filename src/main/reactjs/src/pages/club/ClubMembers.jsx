import React, {useEffect} from 'react';
import Layout from "../../common/Layout";
import MembersTable from "../../components/club/clubMembers/MembersTable";
import ClubMembersHeader from "../../components/club/clubMembers/ClubMembersHeader";
import {Divider} from "@nextui-org/react";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import {useRecoilValue} from "recoil";
import {currentClubMembershipInfoState} from "../../recoil/hooks/UseMembershipApi";

const ClubMembers = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const members = useRecoilValue(currentClubMembershipInfoState);

    return (
        <Layout useHeader={false} useFooter={false} containerMargin="5" containerPadding="0">
            <AnimationRightInWrapper>
                <ClubMembersHeader/>
                <Divider/>
                <MembersTable users = {members.summaryList}/>
            </AnimationRightInWrapper>
        </Layout>
    );
};

export default ClubMembers;
