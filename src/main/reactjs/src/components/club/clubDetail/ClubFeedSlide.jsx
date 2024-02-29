import React, {useState} from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Chip} from "@nextui-org/react";
import FeedCards from "./FeedCards";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import MemberVerificationModal from "../../../utils/MemberVerificationModal";
import {currentMembershipState} from "../../../recoil/hooks/UseMembershipApi";
import {useNavigate} from "react-router-dom";

const ClubFeedSlide = ({isLogin, clubDetail}) => {

    const myMembership = useRecoilValue(currentMembershipState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handelMoreClick = () => {
        if (!isLogin || !myMembership || myMembership.info.role === "WAITING") {
            setIsModalOpen(true);
            return;
        }
        navigate(`/club-feed/${clubDetail.clubId}`);
    }
    return (
        <Section>
            <div className="flex items-center justify-between" style={styles.font}>
                <div className="flex items-center">
                    <IoIosArrowForward class="mr-2"/>
                    <p className="text-md font-bold">모임 후기</p>
                </div>
                <Chip
                    size='sm' variant='flat' color='primary'
                    style={{cursor: 'pointer'}}
                    onClick={handelMoreClick}
                    className="text-md text-tiny item-end">
                    모두 보기</Chip>
            </div>
            <FeedCards/>
            <MemberVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </Section>
    );
};

export default ClubFeedSlide;

const Section = styled.div`
  padding: 5%;
  display: block;
  width: 100%;
`;

const styles = {
    font       : {
        color       : '#F31260',
        marginBottom: '5%',
    },
}
