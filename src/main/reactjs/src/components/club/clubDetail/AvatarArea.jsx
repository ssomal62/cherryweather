import React from 'react';
import {Avatar, AvatarGroup} from "@nextui-org/react";

import {useRecoilValue} from "recoil";
import {currentClubMembershipInfoState} from "../../../recoil/hooks/UseMembershipApi";

const AvatarArea = () => {

    const memberships = useRecoilValue(currentClubMembershipInfoState);

    const safeMemberships = Array.isArray(memberships) ? memberships : [];

    return (
        <AvatarGroup isBordered color='black'  max={6}>
            {safeMemberships.map((member, index) => (
                <Avatar key={member.userId}
                        showFallback
                        aria-label={member.userName}
                        src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${member.userProfile}.jpg?type=f&w=600&h=600&ttype=jpg`}
                        size='lg' radius="lg" />
            ))}
        </AvatarGroup>
    );
};

export default AvatarArea;
