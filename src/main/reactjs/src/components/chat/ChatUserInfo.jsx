import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import "../../style/ChatUserInfoStyle.css";

function ChatUserInfo({ closeModal, messages, accountData }) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <>
      {messages.map((message, index) =>
        message.sender.id !== accountData.email ? (
          <Card className="max-w-[340px] modal" key={index}>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src="message.sender.profile"
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {message.sender.name}
                  </h4>
                </div>
              </div>
              <Button
                color="primary"
                radius="full"
                size="sm"
                variant={isFollowed ? "bordered" : "solid"}
                onPress={() => setIsFollowed(!isFollowed)}
              >
                1:1 채팅
              </Button>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <p></p>
              <span className="pt-2">
                #취미
                <span className="py-2" aria-label="computer" role="img">
                  💻
                </span>
              </span>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">4</p>
                <p className=" text-default-400 text-small">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">
                  97.1K
                </p>
                <p className="text-default-400 text-small">Followers</p>
              </div>
            </CardFooter>
          </Card>
        ) : null
      )}
    </>
  );
}

export default ChatUserInfo;
