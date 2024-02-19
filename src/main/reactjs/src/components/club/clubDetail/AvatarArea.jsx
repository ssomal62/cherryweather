import React from 'react';
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/react";
import {membersState, useMembersState} from "../../../recoil/hooks/UseMembersState";

import {useRecoilValue} from "recoil";
const AvatarArea = () => {
    const members = useRecoilValue(membersState);

    return (
        <AvatarGroup isBordered color='black'  max={6}>
            {members.map((member, index) => (
                <Avatar  key={member.userId}
                         showFallback
                         aria-label={member.screenName}
                         size='lg' radius="lg"/>
            ))}
        </AvatarGroup>
    );
};

export default AvatarArea;
