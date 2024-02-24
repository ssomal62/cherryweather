import React, { useEffect, useState } from "react";
import NextButton from "../club/addClub/NextButton";
import { Button, Input } from "@nextui-org/react";
import styled from "styled-components";
import { instance } from "../../recoil/module/instance";

const AddLoginInfo = ({ onNext, onChange, formData }) => {
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailRuleDesc, setEmailRuleDesc] = useState("");
  const { email, password } = formData;

  useEffect(() => {
    const isFormFilled = email && password && confirmPassword;
    const isPasswordMatch = password === confirmPassword;
    setIsNextDisabled(!(isFormFilled && isPasswordMatch));
  }, [email, password, confirmPassword,isEmailValid]);

  const validateEmail = (email) => {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
  };

  console.log(formData.email);

  useEffect(() => {
    // 이메일 형식 검증
    setIsEmailValid(validateEmail(email));
    // 이메일을 변경할 때마다 중복확인 상태 초기화
    setIsEmailChecked(false);
  }, [email]);


  //email 중복확인 
  const checkEmail = async () => {
      try{
        const res = await instance.get(`/account/check-email?email=${email}`);
        setIsEmailChecked(true);
        alert("사용가능한 이메일입니다.")
      }catch(e){
        alert(e.response.data.message)
        console.log(e);
        setIsEmailChecked(false);
      }
  }

    const emailRegEx = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/; 

    // 이메일 유효성 검증 이벤트함수
    const emailValidation = () => {
      if (emailRegEx.test(email)) {
        setIsEmailValid(true);
        setEmailRuleDesc("");
      } else {
        setIsEmailValid(false);
        setEmailRuleDesc("이메일 형식으로 입력해 주세요.");
      }
    };

  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[A-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;
  const [isPwValid, setIsPwValid] = useState(false);
  const [pwRuleDesc, setPwRuleDesc] = useState("");

      // 패스워드 유효성 검증 이벤트함수
  const passwordValidation = () => {
    if (passwordRegEx.test(password)) {
      setIsPwValid(true);
      setPwRuleDesc("");
    } else {
      setIsPwValid(false);
      setPwRuleDesc(
        "6자 이상 20자 이하의 영문 및 최소 1개이상의 대문자/숫자/특수문자의 조합"
      );
    }
  };

  const [isConfirmPwValid, setIsConfirmPwValid] = useState(false);
  const [ConfirmPwRuleDesc, setConfirmPwRuleDesc] = useState("");

   // 패스워드 재확인 유효성 검증 이벤트함수
   const confirmPwValidation = () => {
    if (confirmPassword === password) {
      setIsConfirmPwValid(true);
      setConfirmPwRuleDesc("");
    } else {
      setIsConfirmPwValid(false);
      setConfirmPwRuleDesc("동일한 비밀번호를 입력");
    }
  };

  

  return (
    <>
      <div style={{ marginBottom: "5px" }}>
        <Span> 사용할 이메일을 입력해주세요</Span>
      </div>
      <div
        className="flex w-full flex-nowrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "20px" }}
      >
        <Input
          name="email"
          type="text"
          variant="underlined"
          radius="lg"
          placeholder="email"
          value={email}
          onChange={onChange}
          style={{ fontSize: 20, fontWeight: 600 }}
          onKeyUp={emailValidation}
        />
        <Button color="danger" variant="ghost" style={{marginTop:"15px"}} onClick={checkEmail} disabled={!isEmailValid || isEmailChecked}>
          중복확인
        </Button>
      </div>
      <Validation>
            <p>{emailRuleDesc}</p>
        </Validation>
      <div style={{ marginBottom: "5px" }}>
        <Span> 암호를 입력해주세요</Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "10px" }}
      >
        <Input
          name="password"
          type="password"
          variant="underlined"
          radius="lg"
          placeholder="password를 입력해주세요"
          value={password}
          onChange={onChange}
          style={{ fontSize: 20, fontWeight: 600 }}
          onKeyUp={passwordValidation}
        />
      </div>
      <Validation>
            <p>{pwRuleDesc}</p>
      </Validation>
      <div style={{ marginBottom: "5px" }}>
        <Span> 암호를 확인합니다</Span>
      </div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        style={{ marginBottom: "10px" }}
      >
        <Input
          name="confirmPassword"
          type="password"
          variant="underlined"
          radius="lg"
          placeholder="위 암호와 동일한 암호를 입력해주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ fontSize: 20, fontWeight: 600 }}
          onKeyUp={confirmPwValidation}
        />
      </div>
          <Validation>
            <p>{ConfirmPwRuleDesc}</p>
          </Validation>
      <br />
      <br />
      <NextButton isNextDisabled={isNextDisabled} onNext={onNext} />
    </>
  );
};

export default AddLoginInfo;

export const Span = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

export const Validation = styled.div`
  padding: 10px 0;
  & p {
    font-size: ${(props) => props.fontSize || "13px"};
    color: ${(props) => props.color || " rgb(240, 63, 64)"};
    margin-top: -4px;
  }

  & span {
    display: block;
    /* margin-top: 10px; */
    font-size: 12px;
    line-height: 18px;
    color: rgb(102, 102, 102);
  }
`;
