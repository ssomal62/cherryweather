import React from 'react';
import {Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import {userInfoState} from "../../recoil/hooks/UseFetchUserInfo";

const InterestModal = ({isOpen,onOpenChange}) => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const {interests} = userInfo;
    console.log(userInfo)
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">내 관심사</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row gap-2">
                                        <div className="flex flex-row flex-wrap gap-2">
                                            {interests.map((item, index) => (
                                                <Chip
                                                    key={index}
                                                    variant="shadow"
                                                    classNames={{
                                                        base: "bg-gradient-to-br from-red-500 to-pink-300 border-small border-white/50 shadow-pink-500/30",
                                                        content: "drop-shadow shadow-black text-white",
                                                    }}
                                                >
                                                    {item}
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    취소
                                </Button>
                                <Button color="danger" onPress={onClose}>
                                    관심사 추가 & 수정
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default InterestModal;