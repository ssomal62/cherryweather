import { atom, useRecoilValue } from "recoil";
import { useCallback } from "react";
import { instance } from "../module/instance";
import { useNavigate } from "react-router-dom";



export const signUpFormState = atom({
    key: 'formData',
    default: { 
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
      birthdate: "1990-01-01",
      profileName: "",
      serviceAgreement: true,
      privacyAgreement: true,
      notifiedAgreement: true,
      interests: [],
      activityAreas: []
    }
  });

  export const useFetchSignUp = () => {
    const formData = useRecoilValue(signUpFormState);
    const navigate = useNavigate();

    return useCallback(async () => {
        try {
            const res = await instance.post('/account/sign-up', formData);
            alert("회원가입 완료");
            navigate('/login/local');
            console.log("회원가입 완료", res.data);
        } catch (error) {
            console.error('회원가입 실패', error);
        }
    }, [formData]);
}

