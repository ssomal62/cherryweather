import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Avatar, Button } from "@nextui-org/react";
import "../../style/ChatUserInfoStyle.css";
import { instance } from "../../recoil/module/instance";
import PersonalChat from "./PersonalChat";

function ChatUserInfo({ selectedMsg, accountData, nc }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isChatClicked, setIsChatClicked] = useState(false);
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

  const handlePersonalChat = () => {
    setIsChatClicked(!isChatClicked);
  };
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
                src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${userInfo.profileImage === "기본이미지 넣어야함"
                    ? "default_image.jpg"
                    : userInfo.profileImage
                  }?type=f&w=600&h=600&ttype=jpg`}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {selectedMsg.sender.name}
                </h4>
                <p className="text-small text-default-400">{userInfo.email}</p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="text-small text-default-400">
            <div
              className="card-body text-small text-default-400"
              style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
            >
              {userInfo.interests.map((interest, index) => (
                <span
                  key={index}
                  className="interests"
                  style={{
                    background: "#f0f0f0",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </CardBody>
          <Button
            color="danger"
            radius="md"
            size="sm"
            style={{ display: "flex" }}
            onClick={handlePersonalChat}
          >
            1:1 채팅
            {isChatClicked && (
              <PersonalChat
                userInfo={userInfo}
                accountData={accountData}
                nc={nc}
              />
            )}
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
