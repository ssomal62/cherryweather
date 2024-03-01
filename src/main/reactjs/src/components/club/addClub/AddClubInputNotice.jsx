import React from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, Textarea, useDisclosure} from "@nextui-org/react";
import UpdateButton from "./UpdateButton";
import FinishButton from "./FinishButton";
import {LuAlertCircle} from "react-icons/lu";

const AddClubInputNotice = ({notice, setNotice, onSave, onUpdate, isClubId}) => {

    const handleNoticeChange = (e) => {
        setNotice(e.target.value);
    };

    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleOpen = () => {
        onOpen();
    }

    const handleClose = () => {
        onClose();
        setNotice(sampleNotice);
    }

    return (
        <>
            <span style={{fontSize: 20, fontWeight: 600}}>마지막으로, <br/>클럽 공지를 작성해볼까요?</span>
            <br/><br/>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Textarea type="text"
                          variant='flat'
                          radius='md'
                          value={notice}
                          classNames={{
                              base : "max-w-full",
                              input: "resize-y min-h-[370px]",
                          }}
                          onChange={(e) => handleNoticeChange(e)}
                />
            </div>
            <br/>
            {isClubId ? (
                <UpdateButton onUpdate={onUpdate} text="Update"/>
            ) : (
                <FinishButton onSave={onSave} text="Save"/>
            )}

            <div className="flex justify-start items-center mt-4 flex-row" style={{color: 'gray'}}>
                <LuAlertCircle style={{marginLeft: 5, marginRight: 5}}/>
                <small>공지는 어떻게 쓰는게 좋을까요?
                    <u style={{cursor: 'pointer', marginLeft: 5}}
                       onClick={() => handleOpen()}>
                        예시 보기</u>
                </small>
            </div>

            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="sm" placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div style={{whiteSpace: 'pre-wrap'}}>
                                    <small>{sampleNotice}</small>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button size="sm" color="danger" variant="light" onPress={onClose}>
                                    닫기
                                </Button>
                                <Button size="sm" color="success" variant="bordered" onPress={handleClose}>
                                    예시 붙여넣기
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddClubInputNotice;

const sampleNotice =
`🤗우리 클럽을 소개해요.
- 음식과 요리에 관심 있는 사람들끼리 함께 요리모임을 가지고 있어요!

🏃🏼‍♂️클럽은 이렇게 활동할 거예요.
- 매주 한 가지 주제로 음식을 만들어보고 새로운 레시피를 공유해요!
- 우리가 만든 음식 사진도 함께 공유할 거예요!

🧸이런 멤버와 함께 하고 싶어요.
- 음식을 좋아하고 새로운 요리에 도전해보고 싶어하는 멤버를 기다려요!
- 함께 요리하고 나누는 즐거움을 함께 누리고 싶어요!

🍒우리 클럽은 이런 규칙을 따라요.
- 서로에게 존중과 배려를 베풀어요!
- 요리모임에 주기적으로 참여해주세요.`
