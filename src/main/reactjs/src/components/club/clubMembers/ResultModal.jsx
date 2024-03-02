import React from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

export default function ResultModal({isOpen, onClose}) {

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
                            <p className="flex flex-row text-small accent-stone-500 items-center justify-center mr-2">
                                변경 완료
                            </p>
                        </ModalBody>
                        <ModalFooter  className="flex justify-center items-center">
                            <Button color="primary" onPress={onClose}>
                                확인
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
