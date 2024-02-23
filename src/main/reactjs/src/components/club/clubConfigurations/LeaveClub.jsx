import React, {useState} from 'react';
import {IoIosArrowForward, IoMdLogIn} from "react-icons/io";
import {instance} from "../../../recoil/module/instance";
import {clubDetailState} from "../../../recoil/hooks/UseClubDetailState";
import {useRecoilValue} from "recoil";
import {useNavigate} from "react-router-dom";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {Cookies} from "react-cookie";

const LeaveClub = ({message}) => {

    const club = useRecoilValue(clubDetailState).clubDetail;
    const navigate = useNavigate();
    const [checkModalOpen, setCheckModalOpen] = useState(false);
    const [resultModalOpen, setResultModalOpen] = useState(false);

    const handleCheckModal = () => {
        setResultModalOpen(false);
        onLeave();
    }

    const handelResultModal = () => {
        setResultModalOpen(false);
        navigate(`/club-details/${club.clubId}`);
    }

    const onLeave = async () => {

        const cookie = new Cookies();
        try {
            const res = await instance.delete(`/membership/${club.clubId}`, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`
                }
            });
            if(res.status === 200){
            }
            setResultModalOpen(true);
            console.log('✅[Membership Delete] Success', res);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between"
                 style={styles.font}
                 onClick={() => setCheckModalOpen(true)}>
                <div className="flex items-center">
                    <p>{message}</p>
                </div>
                <div className="flex items-end">
                    <IoIosArrowForward/>
                </div>
            </div>

            <Modal placement="center" size="sm" backdrop="blur" isOpen={checkModalOpen}
                   onClose={() => setCheckModalOpen(false)}
                   className="fles justify-center items-center">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <IoMdLogIn style={{width: 50, height: 50, color: '#F31260'}}/>
                    </ModalHeader>
                    <ModalBody>
                        정말 클럽을 탈퇴하시겠습니까?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => setCheckModalOpen(false)}>
                            닫기
                        </Button>
                        <Button color="danger" variant="solid" onPress={handleCheckModal}>
                            탈퇴하기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal placement="center" size="sm" backdrop="blur" isOpen={resultModalOpen}
                   onClose={() => setResultModalOpen(false)}
                   className="fles justify-center items-center">
                <ModalContent>
                    <ModalBody>
                        클럽 탈퇴 완료
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" variant="bordered" onPress={handelResultModal}>
                            확인
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
};

export default LeaveClub;

const styles = {
    font: {
        color : 'black', margin: '5% 0 5% 2%',
        cursor: 'pointer',
    },
}
