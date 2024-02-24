import React, {useState} from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Chip} from "@nextui-org/react";
import AvatarArea from "./AvatarArea";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import MemberVerificationModal from "../../../utils/MemberVerificationModal";
import {currentMembershipState} from "../../../recoil/hooks/UseMembershipApi";

const MemberSummary = ({isLogin}) => {

    const myMembership = useRecoilValue(currentMembershipState);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handelMoreClick = () => {
        if (!isLogin || !myMembership ||myMembership.info.role === "WAITING") {
            setIsModalOpen(true);
            return;
        }
        navigate('/club-members')
    }

    return (
        <Section>
            <div className="flex items-center justify-between" style={styles.font}>
                <div className="flex items-center">
                    <IoIosArrowForward class="mr-2"/>
                    <p className="text-md font-bold">가입 멤버</p>
                </div>
                <Chip size='sm' variant='flat' color='primary'
                      style={{cursor: 'pointer'}}
                      onClick={handelMoreClick}
                      className="text-md text-tiny item-end">
                    모두 보기
                </Chip>
            </div>
            <div className="flex items-center">
                <AvatarArea/>
            </div>
            <MemberVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </Section>
    );
};

export default MemberSummary;

const Section = styled.div`
  padding: 5%;
  display: block;
  margin-bottom: 10%;
  width: 100%;
`;

const styles = {
    font: {
        color       : '#F31260',
        marginBottom: '5%',
    },
}

