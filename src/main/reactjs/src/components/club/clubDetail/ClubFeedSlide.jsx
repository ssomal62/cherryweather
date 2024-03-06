import React, {useState} from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Button, Chip} from "@nextui-org/react";
import FeedCards from "./FeedCards";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import MemberVerificationModal from "../../../utils/MemberVerificationModal";
import {currentMembershipState} from "../../../recoil/hooks/UseMembershipApi";
import {useNavigate} from "react-router-dom";
import {MdOutlineAdd} from "react-icons/md";
import {LuAlertCircle} from "react-icons/lu";

const ClubFeedSlide = ({isLogin, clubDetail, clubFeedData}) => {

    const myMembership = useRecoilValue(currentMembershipState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleMoreClick = () => {
        if (!isLogin || !myMembership || myMembership.info.role === "WAITING") {
            setIsModalOpen(true);
            return;
        }
        navigate(`/club-feed/${clubDetail.clubId}`);
    }

    const handleEditorClick = () => {
        if (!isLogin || !myMembership || myMembership.info.role === "WAITING") {
            setIsModalOpen(true);
            return;
        }
        navigate('/feed-editor');
    }
    return (
        <>
            <Section>
                <div className="flex items-center justify-between" style={styles.font}>
                    <div className="flex items-center">
                        <IoIosArrowForward class="mr-2"/>
                        <p className="text-md font-bold">클럽 피드</p>
                    </div>
                    <div className="item-end">
                        <Chip
                            size='sm' variant='flat' color='success'
                            style={{cursor: 'pointer'}}
                            startContent={<MdOutlineAdd/>}
                            className="text-md text-tiny mr-2"
                            onClick={handleEditorClick}
                        >
                            피드 작성</Chip>
                        <Chip
                            size='sm' variant='flat' color='primary'
                            style={{cursor: 'pointer'}}
                            className="text-md text-tiny "
                            onClick={handleMoreClick}
                        >
                            모두 보기</Chip>
                    </div>
                </div>
                {
                    clubFeedData.length === 0 ?
                        (
                            <div
                                className="flex flex-col justify-center items-center text-small text-stone-400  "
                                style={{border: '1px solid #d7d7d7', borderRadius: '20px', height: '7em'}}>
                                <div className="flex flex-row items-center"><LuAlertCircle/>&nbsp;아직 피드가 없네요</div>
                                {
                                    isLogin &&
                                    <Button variant="light" color="danger"
                                            onClick={() => navigate('/event-add')}
                                    ><u>피드 작성하기</u></Button>
                                }
                            </div>
                        )
                        :
                        (<div><FeedCards clubFeedData={clubFeedData}/></div>
                        )
                }
            </Section>
            <MemberVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </>

    );
};

export default ClubFeedSlide;

const Section = styled.div`
  padding: 5%;
  display: block;
  width: 100%;
`;

const styles = {
    font: {
        color       : '#F31260',
        marginBottom: '5%',
    },
}
