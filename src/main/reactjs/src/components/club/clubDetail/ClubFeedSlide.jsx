import React, {useState} from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Chip} from "@nextui-org/react";
import FeedCards from "./FeedCards";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import MemberVerificationModal from "../../../utils/MemberVerificationModal";
import {currentMembershipState} from "../../../recoil/hooks/UseMembershipApi";
import {useNavigate} from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
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
                    <p className="text-md font-bold">클럽 피드</p>
                </div>
                <div className="item-end">
                    <Chip
                        size='sm' variant='flat' color='success'
                        style={{cursor:'pointer'}}
                        startContent={<MdOutlineAdd/>}
                        className="text-md text-tiny mr-2"
                        onClick={()=>navigate('/feed-editor')}
                    >
                        피드 작성</Chip>
                    <Chip
                        size='sm' variant='flat' color='primary'
                        style={{cursor:'pointer'}}
                        className="text-md text-tiny "
                        onClick={handelMoreClick}
                    >
                        모두 보기</Chip>
                </div>
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
