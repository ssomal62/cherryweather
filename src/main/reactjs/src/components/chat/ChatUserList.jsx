import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { BsDoorOpen } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ChatUserListModal = ({
  onClose,
  isOpen,
  channelName,
  disconnectChat,
  messages,
  profileImage,
}) => {
  const closeModal = () => {
    onClose();
  };

  const uniqueSender = Array.from(
    new Set(messages.map((message) => message.sender.name))
  );

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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span style={{ cursor: "pointer" }}>대화 상대</span>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Swiper
                    spaceBetween={5}
                    slidesPerView={Math.min(1, uniqueSender.length)} // 최소값을 2로 설정
                    slidesOffsetBefore={1}
                  >
                    {uniqueSender.map((uniqueSender, index) => (
                      <SwiperSlide
                        key={index}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: 0,
                          }}
                        >
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
                            <Avatar
                              radius="md"
                              size="lg"
                              src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${
                                profileImage === "기본이미지 넣어야함"
                                  ? "default_image.jpg"
                                  : profileImage
                              }?type=f&w=600&h=600&ttype=jpg`}
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />

                            <CardFooter
                              className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
                              style={{
                                height: "30%",
                                fontSize: "12px",
                                color: "white",
                              }}
                              variant="bordered"
                            >
                              {uniqueSender}
                            </CardFooter>
                          </Card>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
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
