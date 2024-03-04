import React from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {IoMdLogIn} from "react-icons/io";
import {useRecoilState} from "recoil";
import {deleteState} from "../recoil/hooks/UseDeleteImage";
const DeleteImageModal = ({isOpen, onClose}) => {
    const [, setIsDeleted] = useRecoilState(deleteState);

    const handleClose = () => {
        setIsDeleted(true);
        onClose();
    };

    return (
        <Modal placement="center" size="sm" backdrop="blur" isOpen={isOpen} onClose={handleClose}
               className="flex justify-center items-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <IoMdLogIn style={{width: 50, height: 50, color: '#F31260'}}/>
                </ModalHeader>
                <ModalBody>
                    삭제가 완료되었습니다.
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={handleClose}>
                        확인
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteImageModal;
