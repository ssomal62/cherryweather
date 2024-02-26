import { Avatar, Badge } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { BsChatDots } from "react-icons/bs";
import { useEffect, useState } from "react";

function ChatRoomListPersonal({ channels, channelName }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
      ) : (
        <>
          {channels.length === 0 || channels.raccountId === null ? (
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
            channels.map((channel, index) => (
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
                        src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                      />
                      <div style={{ marginLeft: "10px", marginTop: "15px" }}>
                        <span>{channel.chatName}</span>
                      </div>
                    </Badge>
                    {/* <Divider /> */}
                  </div>
                )}
              </Link>
            ))
          )}
        </>
      )}
    </>
  );
}

export default ChatRoomListPersonal;
