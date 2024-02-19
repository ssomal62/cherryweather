import React, { useEffect, useState } from "react";
import NextButton from "../club/addClub/NextButton";
import { Input } from "@nextui-org/react";
import styled from "styled-components";

const AddLoginInfo = ({ onNext, onChange, formData }) => {
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email, password } = formData;


  useEffect(() => {
  
    const isFormFilled = email && password && confirmPassword;
    const isPasswordMatch = password === confirmPassword;
    setIsNextDisabled(!(isFormFilled && isPasswordMatch));
  }, [email, password, confirmPassword]); 
  


  console.log(formData.email);

  return (
    <>
    <div style={{marginBottom : "5px"}}>
      <Span>
        {" "}
        사용할 이메일을 입력해주세요
      </Span>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4" style={{marginBottom: '20px'}}>
        <Input
        name="email"
          type="text"
          variant="underlined"
          radius="lg"
          placeholder="email"
          value={email}
          onChange={onChange}
          style={{ fontSize: 20, fontWeight: 600 }}
        />
      </div>
      <div style={{marginBottom : "5px"}}>
      <Span>
        {" "}
        암호를 입력해주세요
      </Span>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4" style={{marginBottom: '10px'}}>
        <Input
        name="password"
          type="password"
          variant="underlined"
          radius="lg"
          placeholder="password를 입력해주세요"
          value={password}
          onChange={onChange}
          style={{ fontSize: 20, fontWeight: 600 }}
        />
      </div>
      <div style={{marginBottom : "5px"}}>
      <Span>
        {" "}
        암호를 확인합니다
      </Span>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4" style={{marginBottom: '10px'}}>
        <Input
            name="confirmPassword"
          type="password"
          variant="underlined"
          radius="lg"
          placeholder="위 암호와 동일한 암호를 입력해주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ fontSize: 20, fontWeight: 600 }}
        />
      </div>
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
