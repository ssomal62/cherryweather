import { Avatar, Badge, Divider, Spinner } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { BsChatDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { instance } from "../../recoil/module/instance";

function ChatRoomListPersonal({ channels, ncloud, accountData, messages }) {
  const [loading, setLoading] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});

  console.log("channelName : ", channels);
  console.log("messages 메세지 정보 : ", messages);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const hasNoRaccountIdChannels = channels.every(
    (channel) => channel.raccountId === null
  );

  // channels 배열에 있는 lastMessage를 이용해서 마지막 메세지 시간과 현재 시간을 계산해서 몇분전에 보냈는지 계산
  const getLastMessageDuration = (lastMessageDate) => {
    if (!lastMessageDate) return "메세지가 없습니다.";

    const now = new Date();
    const lastMessageTime = new Date(lastMessageDate);
    const milliseconds = now - lastMessageTime;
    const minutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return "방금 전";
    }
  };

  // channels 배열에 있는 raccountId를 이용해 프로필 이미지 가져오기
  useEffect(() => {
    const fetchUserProfiles = async () => {
      // raccountIds 배열의 각 요소에 대해 개별적으로 API 호출을 수행하는 Promise 배열 생성
      const promises = channels
        .map((channel) => channel.raccountId)
        .filter((raccountId) => raccountId !== null)
        .map(async (raccountId) => {
          console.log("Fetching user profile for raccountId: ", raccountId);
          const response = await instance.get(
            "/account/getfinduserbyid?accountId=" + raccountId
          );
          return response.data;
        });

      // 모든 API 호출이 완료될 때까지 기다림
      const userProfiles = await Promise.all(promises);
      setUserProfiles(userProfiles);
    };

    fetchUserProfiles();
  }, [channels]);
  console.log("userProfiles : ", userProfiles);
  console.log("channels 채널 : ", channels);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Spinner size="lg" color="danger" />
        </div>
      ) : hasNoRaccountIdChannels ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              fontSize: "70px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <BsChatDots />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            가입한 채팅방이 없습니다.
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
          }}
        >
          {channels.map((channel) => (
            <Link
              key={channel.chatId}
              to={`/chat/room/${channel.chatRoom}/${channel.raccountId}`}
            >
              {channel.raccountId && (
                <div className="channel-list" style={{ marginBottom: "10px" }}>
                  <Badge className="list-photo">
                    <Avatar
                      radius="md"
                      size="lg"
                      src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${
                        userProfiles.find(
                          (img) => img.accountId === channel.raccountId
                        ).profileImage === "기본이미지 넣어야함"
                          ? "default_image.jpg"
                          : userProfiles.find(
                              (img) => img.accountId === channel.raccountId
                            ).profileImage
                      }?type=f&w=600&h=600&ttype=jpg`}
                    />
                    <div
                      style={{ marginLeft: "10px", marginTop: "15px" }}
                      className="flex flex-row"
                    >
                      <span>{channel.chatName}</span>
                    </div>
                  </Badge>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "gray",
                        marginLeft: "65px",
                        marginTop: "-20px",
                      }}
                    >
                      {channel.lastMessage?.content === null
                        ? "파일을 보냈습니다."
                        : channel.lastMessage?.content?.length > 20
                        ? channel.lastMessage.content.substring(0, 20) + "..."
                        : channel.lastMessage?.content}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "gray",
                        marginTop: "-40px",
                      }}
                    >
                      {getLastMessageDuration(channel.lastMessage?.created_at)}
                    </span>
                  </div>
                  <Divider />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default ChatRoomListPersonal;
