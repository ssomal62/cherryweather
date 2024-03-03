import React from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {IoMdLogIn} from "react-icons/io";

const UnableToJoinModal = ({isOpen, onClose}) => {

    return (
        <Modal placement="center" size="sm" backdrop="blur" isOpen={isOpen} onClose={onClose}
               className="fles justify-center items-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <IoMdLogIn style={{width: 50, height: 50, color: '#F31260'}}/>
                        </ModalHeader>
                        <ModalBody>
                            더이상 가입할 수 없습니다.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="solid" onPress={() => onClose()}>
                                확인
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UnableToJoinModal;
