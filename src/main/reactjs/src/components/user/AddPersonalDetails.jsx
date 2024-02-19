import React, { useEffect, useState } from "react";
import { Span } from "./AddLoginInfo";
import { Button, Input } from "@nextui-org/react";
import styled from "styled-components";
import { AiOutlineWoman } from "react-icons/ai";
import { AiOutlineMan } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { signUpFormState } from "../../recoil/hooks/UseFetchSignUP";
import NextButton from "../club/addClub/NextButton";

const AddPersonalDetails = ({ onNext, onChange, formData }) => {
  const { name, profileName, phoneNumber, gender } = formData;
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const setFormData = useSetRecoilState(signUpFormState);

  console.log(gender);

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const onlyNums = value.replace(/[^\d]/g, ""); // 숫자만 허용합니다.

    let formattedValue = onlyNums;
    if (onlyNums.length <= 3) {
      formattedValue = onlyNums;
    } else if (onlyNums.length <= 7) {
      formattedValue = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    } else if (onlyNums.length > 7) {
      formattedValue = `${onlyNums.slice(0, 3)}-${onlyNums.slice(
        3,
        7
      )}-${onlyNums.slice(7, 11)}`;
    }

    // Recoil 상태를 업데이트하기 위한 handleChange 함수 호출
    setFormData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  console.log(name, profileName, phoneNumber);

  useEffect(() => {
    const checkConditions = name.length >= 2 &&
                            profileName.length >= 2 &&
                            phoneNumber.length === 13 &&
                            (gender === 'MALE' || gender === 'FEMALE');
    
    setIsNextDisabled(!checkConditions);
  }, [name, profileName, phoneNumber, gender]);

  return (
    <>
      <div style={{ marginBottom: "5px" }}>
        <Span> 회원 이름을 입력해주세요</Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "20px" }}
      >
        <Input
          name="name"
          type="text"
          variant="underlined"
          radius="lg"
          placeholder="이름 (2자 이상)"
          value={name}
          onChange={onChange}
          style={{ fontSize: 20, fontWeight: 600 }}
        />
      </div>
      <div style={{ marginBottom: "5px" }}>
        <Span> 모임에서 사용할 닉네임을 입력해주세요</Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "20px" }}
      >
        <Input
          name="profileName"
          type="text"
          variant="underlined"
          radius="lg"
          placeholder="닉네임 (2자 이상)"
          value={profileName}
          onChange={onChange}
          style={{ fontSize: 20, fontWeight: 600 }}
        />
      </div>
      <div style={{ marginBottom: "5px" }}>
        <Span> 연락처를 입력해주세요.</Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "20px" }}
      >
        <Input
          name="phoneNumber"
          type="text"
          variant="underlined"
          radius="lg"
          placeholder="000-0000-0000 (숫자만 입력해주세요)"
          value={phoneNumber}
          onChange={handlePhoneChange}
          maxLength={13}
          style={{ fontSize: 20, fontWeight: 600 }}
        />
      </div>
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <Span style={{ textAlign: "center" }}> 성별을 선택해주세요</Span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Btn
          name="gender"
          startContent={<AiOutlineMan style={{ ...styles.icon }} />}
          fullWidth
          color={gender === "MALE" ? "danger" : "default"}
          value="MALE"
          variant="solid"
          onClick={() =>
            onChange({ target: { name: "gender", value: "MALE" } })
          }
        >
          <span
            style={{ fontSize: 20, fontWeight: 600, alignContent: "start" }}
          >
            남자
            <br />
          </span>
        </Btn>
        <Btn
          name="gender"
          startContent={<AiOutlineWoman style={{ ...styles.icon }} />}
          fullWidth
          color={gender === "FEMALE" ? "danger" : "default"}
          value="FEMALE"
          variant="solid"
          onClick={() =>
            onChange({ target: { name: "gender", value: "FEMALE" } })
          }
        >
          <span
            style={{ fontSize: 20, fontWeight: 600, alignContent: "start" }}
          >
            여자
          </span>
        </Btn>
      </div>
      <br />
      <br />
      <br />
      <div>
        <NextButton isNextDisabled={isNextDisabled} onNext={onNext} />
      </div>
    </>
  );
};

export default AddPersonalDetails;

const Btn = styled(Button)`
  height: 70px;
  flex: 1 1 auto;
  margin-right: 8px;
  margin-left: 8px;
`;

const styles = {
  icon: {
    width: 30,
    height: 30,
    color: "black",
  },
};
