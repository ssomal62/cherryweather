import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { BsDoorOpen } from "react-icons/bs";
import { is } from "@babel/types";
import { on } from "events";

const ChatUserListModal = ({
  onClose,
  isOpen,
  channelName,
  disconnectChat,
}) => {
  const [userListModal, setUserListModal] = useState(false);

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {channelName}
            </ModalHeader>
            <ModalBody>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ cursor: "pointer" }}>채팅방 서랍</span>
                <Card
                  isFooterBlurred
                  radius="lg"
                  className="border-none"
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "10px 5px 5px 5px",
                  }}
                >
                  <Image
                    alt="Woman listing to music"
                    className="object-cover"
                    height={100}
                    src="/images/hero-card.jpeg"
                    width={100}
                  />

                  {/* <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-tiny text-white/80">Available soon.</p>
                    <Button
                      className="text-tiny text-white bg-black/20"
                      variant="flat"
                      color="default"
                      radius="lg"
                      size="sm"
                    >
                      Notify me
                    </Button>
                  </CardFooter> */}
                </Card>
              </div>

              <div>대화 상대</div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={disconnectChat}>
                <BsDoorOpen />
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ChatUserListModal;
