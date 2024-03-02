import React, {useState} from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";
import {instance} from "../../../recoil/module/instance";
import EmailSuccess from "./EmailSuccess";


const FindEmail = ({isOpen,onOpenChange}) => {
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isInnerModalOpen, setIsInnerModalOpen] = useState(false);
    const [email, setEmail] = useState('');

    console.log(userName)

    const handleFindEmail = async () => {
        try{

            const submitData = {
                name: userName,
                phoneNumber: phoneNumber
            }
            const res = await instance.post('/account/find-email', submitData);
            // console.log(res.Promise.data);
            setEmail(res.data); // 이메일 상태 업데이트
            setIsInnerModalOpen(true); // 내부 모달 상태를 true로 설정하여 모달 열기
            setPhoneNumber('');
            setUserName('');
        }catch (error){
            console.error(error);
            alert("해당하는 정보가 없습니다")
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">email 찾기</ModalHeader>
                            <ModalBody>
                                <Input label="이름" name="name" value={userName} onChange={(e)=>setUserName(e.target.value)}></Input>
                                <Input label="휴대폰 번호" name="phoneNumber" classNames="mt-2" value={phoneNumber} placeholder="'-'을 포함하여 입력해주세요" onChange={(e)=>setPhoneNumber(e.target.value)}></Input>
                                <small>회원가입시에 등록한 <b className="text-red-400">이름</b>과 <b className="text-red-400">휴대폰 번호</b>를 입력해주세요</small>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    취소
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={handleFindEmail}>
                                    eamil 찾기
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <EmailSuccess isOpen={isInnerModalOpen} onOpenChange={setIsInnerModalOpen} email={email}/>
        </>
    );
};

export default FindEmail;