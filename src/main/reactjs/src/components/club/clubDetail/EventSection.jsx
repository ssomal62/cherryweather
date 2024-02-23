import React, {useState} from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Chip} from "@nextui-org/react";
import SwiperCardSection from "./SwiperCardSection";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../../recoil/LoginAtom";
import MemberVerificationModal from "../../../utils/MemberVerificationModal";
import {isMemberState, memberInfoState} from "../../../recoil/hooks/CheckIsMember";

const EventSection = () => {

    const isLogin = useRecoilValue(IsLoginAtom);
    const membership = useRecoilValue(memberInfoState);
    const isMember = useRecoilValue(isMemberState);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handelMoreClick = () => {
        if (!isLogin || !isMember ||membership.role === "WAITING") {
            setIsModalOpen(true);
            return;
        }
       // navigate('/')
    }

    return (
        <section>
            <EventTitle>
                <div className="flex items-center justify-between" style={styles.font}>
                    <div className="flex items-center">
                        <IoIosArrowForward class="mr-2"/>
                        <p className="text-md font-bold">모임 참여해요!</p>
                    </div>
                    <Chip
                        size='sm' variant='flat' color='primary'
                        style={{cursor:'pointer'}}
                        className="text-md text-tiny item-end"
                        onClick={handelMoreClick}
                    >
                        모두 보기</Chip>
                </div>
            </EventTitle>
            <EventList>
                <SwiperCardSection/>
            </EventList>

            <MemberVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </section>
    );
};

export default EventSection;

const EventList = styled.div`
  display: block;
  left: 0;
`;

const EventTitle = styled.div`
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 5%;
  display: block;
  width: 100%;
`;

const styles = {
    font: {
        color       : '#F31260',
        marginBottom: '5%',
    },
}
