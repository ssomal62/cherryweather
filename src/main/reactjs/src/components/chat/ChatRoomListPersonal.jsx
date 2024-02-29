import { Avatar, Badge, Divider } from "@nextui-org/react";
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
  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              fontSize: "70px",
              textAlign: "center",
              display: "flex",
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
            채팅방을 불러오고 있습니다.
          </div>
        </div>
      ) : hasNoRaccountIdChannels ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              fontSize: "70px",
              textAlign: "center",
              display: "flex",
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
        <>
          {channels.map((channel) => (
            <Link
              key={channel.chatId}
              to={`/chat/room/${channel.chatRoom}/${channel.raccountId}`}
            >
              {channel.raccountId && (
                <div className="channel-list" style={{ marginTop: "20px" }}>
                  <Badge className="list-photo">
                    <Avatar
                      radius="md"
                      size="lg"
                      src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${
                        userProfiles.profileImage === "기본이미지 넣어야함" ||
                        "default_image.jpg"
                          ? "default_image.jpg"
                          : userProfiles.profileImage
                      }?type=f&w=600&h=600&ttype=jpg`}
                    />
                    <div style={{ marginLeft: "10px", marginTop: "15px" }}>
                      <span>{channel.chatName}</span>
                    </div>
                  </Badge>
                  <Divider />
                </div>
              )}
            </Link>
          ))}
        </>
      )}
    </>
  );
}

export default ChatRoomListPersonal;
