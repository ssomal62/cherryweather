import React from "react";
import {Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

export default function RemoveMemberModal({isOpen, onClose, selectUser, setTargetMembershipId}) {

    const handleRoleChange = () => {
        setTargetMembershipId(selectUser.membershipId);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            size="sm"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody>
                            {selectUser.role === "WAITING" ?
                                <p className="flex flex-row text-small accent-stone-500 items-center justify-center mr-2">
                                    가입 요청을 거절하시겠습니까??
                                </p>
                                :
                                <p className="flex flex-row text-small accent-stone-500 items-center justify-center mr-2">
                                    <Chip color="warning" variant="flat">{selectUser.userName}</Chip>님을 클럽에서 추방하시겠습니까?
                                </p>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                취소
                            </Button>
                            <Button color="primary" onPress={handleRoleChange}>
                                변경
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
