import React from "react";
import { Root } from "../../common/Layout";
import SignUpForm from "../../components/user/SignUpForm";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const prevStep = () => {
        navigate("/login")
    }
    
  return (
    <Root>
      {/* <SignUpForm /> */}
    </Root>


  );
};

export default SignUp;
