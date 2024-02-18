import React, { useState } from "react";
import Layout from "../../common/Layout";
import { useNavigate } from "react-router-dom";
import { IconWapper, Nav, Title, TitleWapper } from "./MyPage";
import { IoArrowBack } from "react-icons/io5";
import AddLoginInfo from "../../components/user/AddLoginInfo";
import AddPersonalDetails from "../../components/user/AddPersonalDetails";
import AddActivityAreas from "../../components/user/AddActivityAreas";
import { Progress } from "@nextui-org/react";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import AnimationLeftInWrapper from "../../utils/animations/AnimationLeftInWrapper";
import { useRecoilState } from "recoil";
import { signUpFormState } from "../../recoil/hooks/UseFetchSignUP";
import AddInterests from "../../components/user/AddInterests";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(signUpFormState);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [animationDirection, setAnimationDirection] = useState("left");

  const nextStep = () => {
    setStep(step + 1);
    setProgress(progress + 25);
    setAnimationDirection("left");
  };
  const prevStep = () => {
    setStep(step - 1);
    setProgress(progress - 25);
    setAnimationDirection("left");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AddLoginInfo
            onNext={nextStep}
            formData={formData}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <AddPersonalDetails
            onNext={nextStep}
            formData={formData}
            onChange={handleChange}
          />
        );

      case 3:
        return (
          <AddInterests
            onNext={nextStep}
            formData={formData}
            onChange={handleChange}
          />
        );

      case 4:
        return (
          <AddActivityAreas
            onNext={nextStep}
            formData={formData}
            onChange={handleChange}
          />
        );

      default:
        return navigate("/");
    }
  };

  return (
    <Layout useHeader={false} useFooter={false}>
      <Nav>
        <div style={{ flex: "1px" }}>
          <IoArrowBack
            style={{ width: 30, height: 30, color: "black" }}
            onClick={prevStep}
          />
        </div>
        <TitleWapper>
          <Title>회원가입</Title>
        </TitleWapper>
        <IconWapper></IconWapper>
      </Nav>
      <Progress
        aria-label="Loading..."
        value={progress}
        color="danger"
        className="max-w my-[20px]"
      />

      {animationDirection === "right" ? (
        <AnimationRightInWrapper key={step}>
          {renderStep()}
        </AnimationRightInWrapper>
      ) : (
        <AnimationLeftInWrapper key={step}>
          {renderStep()}
        </AnimationLeftInWrapper>
      )}
    </Layout>
  );
};

export default SignUp;
