import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { IoMdLogIn } from "react-icons/io";

const JoinEventModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      placement="center"
      size="sm"
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      className="fles justify-center items-center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <IoMdLogIn style={{ width: 50, height: 50, color: "#F31260" }} />
        </ModalHeader>
        <ModalBody>이벤트에 가입 되었습니다.</ModalBody>
        <ModalFooter>
          <Button color="danger" variant="solid" onPress={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinEventModal;
