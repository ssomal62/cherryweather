import React from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {IoMdLogIn} from "react-icons/io";

const LoginVerificationModal = ({isOpen, onClose}) => {

    ///////
    // const isLogin = useRecoilValue(IsLoginAtom);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    //
    // if (!isLogin) {
    //     setIsModalOpen(true);
    //     return;
    // }
    //
    // <LoginVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    ///////

    const navigate = useNavigate();

    const handleOnClose = () => {
        onClose();
        navigate('/login');
    };

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
                            로그인 후 이용가능합니다
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                둘러보기
                            </Button>
                            <Button color="danger" variant="solid" onPress={handleOnClose}>
                                로그인하기
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default LoginVerificationModal;
