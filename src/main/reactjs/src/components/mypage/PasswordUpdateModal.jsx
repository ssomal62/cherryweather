import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { instance } from "../../recoil/module/instance";
import { Cookies } from "react-cookie";

const PasswordUpdateModal = ({ isOpen, onOpenChange }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const cookies = new Cookies();

  const changePassword = async () => {
    try {
    const submitData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
    }
    const config = {
        headers: {
            Authorization: `Bearer ${cookies.get("accessToken")}`,
        },
    }
      const res = await instance.post("/account/change-password", submitData, config)
      console.log(res)
      alert(res.data)
        onOpenChange(false)
      setNewPassword("")
      setNewPasswordConfirm("")
      setOldPassword("")
    } catch (error) {
        console.error("패스워드 변경 실패", error);
        alert(error.response.data.message)
    }
}
 


  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1" color="danger">
              패스워드 변경
            </ModalHeader>
              <ModalBody>
                  <Input
                      type="password"
                      label="사용중인 암호"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                  />

                  <div style={{marginTop: "20px"}}>
                      <Input
                          type="password"
                          label="새로운 암호"
                          name="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                      />
                  </div>
                  <Input
                      type="password"
                      label="새로운 암호 확인"
                      name="newPasswordConfirm"
                      value={newPasswordConfirm}
                      onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  />
                  <small> 비밀번호는 8자 이상, <b style={{color: "red"}}>대문자, 소문자, 숫자, 특수문자</b>를 모두 포함해야 합니다 <br/>
                  </small>
              </ModalBody>
              <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                      취소
                  </Button>
                  <Button color="danger" onClick={changePassword}>변경</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PasswordUpdateModal;
