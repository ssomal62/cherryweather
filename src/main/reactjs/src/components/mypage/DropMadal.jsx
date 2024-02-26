import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/hooks/UseFetchUserInfo';
import { instance } from '../../recoil/module/instance';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { IsLoginAtom } from '../../recoil/LoginAtom';
const DropMadal = ( { isOpen, onOpenChange }) => {
    const userInfo = useRecoilValue(userInfoState);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {email} = userInfo;
    const cookie = new Cookies();
    const setIsLogin = useSetRecoilState(IsLoginAtom);

    // 회원 탈퇴 엑시오스
    const handleDrop = async () => {
      try {
        const params = new URLSearchParams({ password: password }).toString(); // password를 쿼리 스트링으로 변환
        const config = {
          headers: {
            Authorization: `Bearer ${cookie.get('accessToken')}`,
          }
        };
        const res = await instance.delete(`/account/drop-out?${params}`, config);
        console.log(res);
        alert("회원 탈퇴가 완료되었습니다.");
        onOpenChange();
        submitLogout();
      } catch (e) {
        console.log(e);
        alert(e.response.data.message);
      }
    }

    const submitLogout = async () => {
      try {
          const requestBody = {
              accessToken: cookie.get("accessToken"),
          };
          const config = {
              headers: {
                  Authorization: `Bearer ${requestBody.accessToken}`,
                  'Content-Type': 'application/json'
              },
          };
      const res = await instance.delete("/auth/sign-out", { data : requestBody, ...config });
      console.log(res);
      cookie.remove("accessToken");
      cookie.remove("refreshToken");
      setIsLogin(false);
      navigate("/");
      } catch (error) {
      console.error(error);
      }  
  }

    return (
      <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">회원 탈퇴</ModalHeader>
              <ModalBody>
              <Input type="email" label="Email" value={email} disabled/>
              <Input type="password" label="Password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
                <small> 
                  회원 탈퇴시 모든 정보가 <b style={{color:"red"}}>삭제</b>됩니다. <br />
                  탈퇴를 위해 암호를 입력해주세요.
                </small>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button color="danger" onClick={handleDrop}>
                  탈퇴
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    );
};

export default DropMadal;
