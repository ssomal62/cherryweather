import React from 'react';
import {Avatar, AvatarGroup} from "@nextui-org/react";
import {membersState} from "../../../recoil/hooks/UseMembersState";

import {useRecoilValue} from "recoil";
const AvatarArea = () => {
    const members = useRecoilValue(membersState);

    return (
        <AvatarGroup isBordered color='black'  max={6}>
            {members.map((member, index) => (
                <Avatar  key={member.userId}
                         showFallback
                         aria-label={member.userName}
                         src = {`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${member.userProfile}.jpg?type=f&w=600&h=600&ttype=jpg`}
                         size='lg' radius="lg"/>
            ))}
        </AvatarGroup>
    );
};

export default AvatarArea;
