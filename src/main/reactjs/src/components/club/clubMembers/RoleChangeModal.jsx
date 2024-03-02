import React from "react";
import {Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

export default function RoleChangeModal({isOpen, onClose, selectUser, setChangedRole, setTargetStatus, setTargetMembershipId}) {

    const handleRoleChange = () => {
        const newRole = selectUser.role === "MEMBER" ? "MODERATOR" : "MEMBER";
        setChangedRole(newRole);
        setTargetStatus(selectUser.status);
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
                        <ModalHeader className="flex flex-col gap-1">{selectUser.name}님 권한 변경</ModalHeader>
                        <ModalBody>
                            {
                                selectUser.role === "MEMBER" &&
                                <p className="flex flex-row text-small accent-stone-500 items-center justify-center mr-2">
                                    <Chip color="primary" variant="flat">운영자</Chip> 로 권한을 변경을 하시겠습니까?
                                </p>
                            }
                            {
                                selectUser.role === "MODERATOR" &&
                                <p className="flex flex-row text-small accent-stone-500 items-center justify-center mr-2">
                                    <Chip color="default" variant="flat">일반회원</Chip> 으로 권한을 변경을 하시겠습니까?
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
