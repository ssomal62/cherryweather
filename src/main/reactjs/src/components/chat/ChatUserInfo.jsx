import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import "../../style/ChatUserInfoStyle.css";
import { instance } from "../../recoil/module/instance";

function ChatUserInfo({ selectedMsg }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await instance.get(
          "/account/getfinduser?email=" + selectedMsg.sender.id
        );
        console.log("response : ", response.data);
        setUserInfo(response.data); // 사용자 정보 설정
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, [selectedMsg]);
  return (
    <>
      {userInfo && (
        <Card className="modal">
          <CardHeader>
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={selectedMsg.sender.profile}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {selectedMsg.sender.name}
                </h4>
                <p className="text-small text-default-400">{userInfo.email}</p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="px-3 py-5 text-small text-default-400">
            {userInfo.interests}
            {/* {userInfo.introduce ? (
                <p>{userInfo.introduce}</p>
              ) : (
                <p>자기소개가 없습니다.</p>
              )  
              } */}
          </CardBody>
          <Button
            color="danger"
            radius="md"
            size="sm"
            style={{ display: "flex" }}
          >
            1:1 채팅
          </Button>
          {/* <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">4</p>
              <p className=" text-default-400 text-small">Following</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">97.1K</p>
              <p className="text-default-400 text-small">Followers</p>
            </div>
          </CardFooter> */}
        </Card>
      )}
    </>
  );
}

export default ChatUserInfo;
