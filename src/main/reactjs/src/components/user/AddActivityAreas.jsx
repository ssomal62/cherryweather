import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import DaumPostcode from "react-daum-postcode";
import { LuAlertCircle } from "react-icons/lu";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { signUpFormState, useFetchSignUp } from "../../recoil/hooks/UseFetchSignUP";
import { HiOutlineHome } from "react-icons/hi";
import { FaRegBuilding } from "react-icons/fa";
import { TiStarOutline } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";


const AddActivityAreas = () => {
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure("");
  const [homeLocation, setHomeLocation] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [interestAreaLocation, setInterestAreaLocation] = useState("");
  const setFormData = useSetRecoilState(signUpFormState);
  const [currentAddressType, setCurrentAddressType] = useState("");
  const formData = useRecoilValue(signUpFormState);
  const fetchSignUp = useFetchSignUp();

  const openHomeModal = () => {
    setCurrentAddressType("HOME");
    onOpen();
    setIsNextDisabled(false);
  };

  const openWorkModal = () => {
    setCurrentAddressType("WORK");
    onOpen();
  };

  const openInterestAreaModal = () => {
    setCurrentAddressType("INTEREST_AREA");
    onOpen();
  };

  const completeAddress = (data) => {
    const fullAddress = data.sido + " " + data.sigungu;

    if (currentAddressType === "HOME") {
      setHomeLocation(fullAddress);
      updateActivityAreas("HOME", fullAddress);
    } else if (currentAddressType === "WORK") {
      setWorkLocation(fullAddress);
      updateActivityAreas("WORK", fullAddress);
    } else if (currentAddressType === "INTEREST_AREA") {
      setInterestAreaLocation(fullAddress);
      updateActivityAreas("INTEREST_AREA", fullAddress);
    }

    onOpenChange();
  };

  console.log("homeLocation", homeLocation);
  console.log(formData);

  const updateActivityAreas = (type, location) => {
    setFormData((oldFormData) => {
      const newActivityAreas = oldFormData.activityAreas.filter(
        (area) => area.type !== type
      );

      if (location) {
        newActivityAreas.push({ type, location });
      }

      return {
        ...oldFormData,
        activityAreas: newActivityAreas,
      };
    });
  };

  return (
    <>
      <span style={{ fontSize: 20, fontWeight: 600 }} className="mb-[10px]">
        활동 지역을 알려주세요.
      </span>
      <br />
      <br />
      <div onClick={openHomeModal}>
        <Input
          type="text"
          value={homeLocation}
          startContent={<HiOutlineHome Marker style={{ ...styles.icon }} />}
          placeholder=" 예시 : 강남구 신사동 (집 주소 필수입력)"
        />
      </div>
      <br />
      <span style={{ fontSize: 20, fontWeight: 600 }} className="mb-[10px]">
        직장
      </span>
      <br />
      <br />
      <div onClick={openWorkModal}>
        <Input
          type="text"
          value={workLocation}
          startContent={<FaRegBuilding style={{ ...styles.icon }} />}
          placeholder=" 직장 ( 선택 )"
        />
      </div>
      <br />
      <span style={{ fontSize: 20, fontWeight: 600 }} className="mb-[10px]">
        관심지역
      </span>
      <br />
      <br />
      <div onClick={openInterestAreaModal}>
        <Input
          type="text"
          value={interestAreaLocation}
          startContent={<TiStarOutline style={{ ...styles.icon }} />}
          placeholder=" 관심지역 ( 선택 )"
        />
      </div>
      <br />
      <div style={{ ...styles.description }}>
        <LuAlertCircle
          style={{ marginLeft: 5, marginRight: 5, float: "left" }}
        />
        <span className="text-tiny">주소를 선택하면 지역이 등록됩니다.</span>
      </div>
      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        onOpenChange={onOpenChange}
        className="max-w"
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
      <br />

      <Button
        isDisabled={isNextDisabled}
        variant="ghost"
        startContent={<FaCheck style={{ ...styles.icon }} />}
        size="lg"
        color="danger"
        fullWidth
        onClick={fetchSignUp}
      >
        회원 가입
      </Button>
    </>
  );
};

export default AddActivityAreas;

const styles = {
  description: {
    display: "flex",
    justifyContent: "left",
    color: "gray",
  },
  icon: {
    width: 24,
    height: 24,
  },
};
