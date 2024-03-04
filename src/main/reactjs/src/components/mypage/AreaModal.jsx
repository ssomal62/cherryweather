import React, {useEffect, useState} from 'react';
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input
} from "@nextui-org/react";
import {HiOutlineHome} from "react-icons/hi";
import {FaRegBuilding} from "react-icons/fa";
import {TiStarOutline} from "react-icons/ti";
import DaumPostcode from "react-daum-postcode";
import {useRecoilState} from "recoil";
import {useFetchUserInfo, useModifyUserInfo, userInfoState} from "../../recoil/hooks/UseFetchUserInfo";

const AreaModal = ({isOpen, onOpenChange}) => {
    const [currentAddressType, setCurrentAddressType] = useState("");
    const [isInnerModalOpen, setIsInnerModalOpen] = useState(false);
    const fetchUserInfo = useFetchUserInfo();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const modifyUserInfo = useModifyUserInfo();

    console.log(userInfo.activityAreas);

    useEffect(() => {
        fetchUserInfo();
    }, []);


    useEffect(() => {
        const originalActivityAreas = fetchUserInfo().activityAreas; // 원본 데이터 가져오기
        if (JSON.stringify(originalActivityAreas) !== JSON.stringify(userInfo.activityAreas)) {
            setIsDataChanged(true);
        } else {
            setIsDataChanged(false);
        }
    }, []);


    const openHomeModal = () => {
        setCurrentAddressType("HOME");
        setIsInnerModalOpen(true); // 내부 모달 열기
    };

    const openWorkModal = () => {
        setCurrentAddressType("WORK");
        setIsInnerModalOpen(true); // 내부 모달 열기
    };

    const openInterestAreaModal = () => {
        setCurrentAddressType("INTEREST_AREA");
        setIsInnerModalOpen(true); // 내부 모달 열기
    };


    const completeAddress = (data) => {
        const fullAddress = data.sido + " " + data.sigungu;
        updateActivityAreas(currentAddressType, fullAddress);
        setIsInnerModalOpen(false);
        // Recoil 상태 업데이트
        setUserInfo((oldUserInfo) => ({
            ...oldUserInfo,
            activityAreas: oldUserInfo.activityAreas.map((area) =>
                area.type === currentAddressType ? { ...area, location: fullAddress } : area
            ),
        }));
    };

    const updateActivityAreas = (type, location) => {
        setUserInfo((oldUserInfo) => {
            const newActivityAreas = oldUserInfo.activityAreas.filter((area) => area.type !== type);
            if (location) {
                newActivityAreas.push({ type, location });
                setIsDataChanged(true);
            }
            return {
                ...oldUserInfo, activityAreas: newActivityAreas,
            };
        });
    };

    const getLocation = (type) => {
        const area = userInfo.activityAreas.find(area => area.type === type);
        return area ? area.location : "";
    };

    const handleSave = () => {
        if (isDataChanged) {
            modifyUserInfo();
            onOpenChange()
        } else {
            alert("바뀐 데이터가 없습니다.");
        }
    };


    return (<>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">내 활동지역</ModalHeader>
                    <ModalBody>
                        <span style={{fontSize: 20, fontWeight: 600}}>
                            홈
                        </span>
                        <div onClick={openHomeModal}>
                            <Input
                                type="text"
                                value={getLocation("HOME")}
                                startContent={<HiOutlineHome style={{...styles.icon}}/>}
                                placeholder=" 예시 : 강남구 신사동 (집 주소 필수입력)"
                            />
                        </div>
                        <span style={{fontSize: 20, fontWeight: 600}}>
                            직장
                        </span>
                        <div onClick={openWorkModal}>
                            <Input
                                type="text"
                                value={getLocation("WORK")}
                                startContent={<FaRegBuilding style={{...styles.icon}}/>}
                                placeholder=" 직장 ( 지역을 추가해주세요 ) "
                            />
                        </div>
                        <span style={{fontSize: 20, fontWeight: 600}}>
                        관심지역
                        </span>
                        <div onClick={openInterestAreaModal}>
                            <Input
                                type="text"
                                value={getLocation("INTEREST_AREA")}
                                startContent={<TiStarOutline style={{...styles.icon}}/>}
                                placeholder=" 관심 ( 지역을 추가해주세요 ) "
                            />
                        </div>
                        <Modal
                            isOpen={isInnerModalOpen} // 내부 모달 상태 사용
                            placement="bottom-center"
                            onOpenChange={setIsInnerModalOpen} // 내부 모달 상태 변경 함수 사용
                            className="max-w"
                            style={{ zIndex: 2000 }} // z-index 설정
                        >
                            <ModalContent>
                                <ModalHeader className="flex flex-col gap-1">지역 조회</ModalHeader>
                                <ModalBody>
                                    <DaumPostcode
                                        autoClose
                                        onComplete={completeAddress}
                                        submitMode="false"
                                        useBannerLink="false"
                                        hideMapBtn="true"
                                        hideEngBtn="true"
                                    />
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                        <br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            취소
                        </Button>
                        <Button color="danger" onClick={handleSave}>
                            지역 추가 & 수정
                        </Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
    </>);
};

export default AreaModal;

const styles = {
    description: {
        display: "flex", justifyContent: "left", color: "gray",
    }, icon: {
        width: 24, height: 24,
    },
};
