import React, {useState} from 'react';
import {IoIosArrowForward} from "react-icons/io";
import {Chip} from "@nextui-org/react";
import SwiperCardSection from "./SwiperCardSection";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {IsLoginAtom} from "../../../recoil/LoginAtom";
import MemberVerificationModal from "../../../utils/MemberVerificationModal";
import {currentMembershipState} from "../../../recoil/hooks/UseMembershipApi";
import {MdOutlineAdd} from "react-icons/md";

const EventSection = () => {

    const isLogin = useRecoilValue(IsLoginAtom);

    const myMembership = useRecoilValue(currentMembershipState);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handelMoreClick = () => {
        if (!isLogin || !myMembership ||myMembership.info.role === "WAITING") {
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
                    <div className="item-end">
                    <Chip
                        size='sm' variant='flat' color='success'
                        style={{cursor:'pointer'}}
                        startContent={<MdOutlineAdd/>}
                        className="text-md text-tiny mr-2"
                        //onClick={}
                    >
                        모임 생성</Chip>
                    <Chip
                        size='sm' variant='flat' color='primary'
                        style={{cursor:'pointer'}}
                        className="text-md text-tiny "
                        onClick={handelMoreClick}
                    >
                        모두 보기</Chip>
                    </div>
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
