import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import styled from "styled-components";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { TbJacket } from "react-icons/tb";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { FiMapPin } from "react-icons/fi";
import { IoAirplaneOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
const MyPageMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item) => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    navigate(item.navigateTo, { state: { from: location.pathname } });
  };

  const menu = [
    {
      key: "club-add",
      label: "모임 만들기",
      icon: <IoMdAddCircleOutline style={styles.icon} />,
      navigateTo: "/club-add",
    },
    {
      key: "imageList",
      label: "내 AI 코디",
      icon: <TbJacket style={styles.icon} />,
      navigateTo: "/ai",
    },
    {
      key: "activity-area",
      label: "활동 지역",
      icon: <FiMapPin style={styles.icon} />,
      navigateTo: "",
    },
    {
      key: "interests",
      label: "관심사",
      icon: <IoAirplaneOutline style={styles.icon} />,
      navigateTo: "",
    },
    {
      key: "chat/admin",
      label: "관리자 채팅",
      icon: <AiOutlineMessage style={styles.icon} />,
      navigateTo: "/chat/admin",
    },
  ];

  return (
    <div style={{ padding: "20px 20px 50px 20px" }}>
      <Listbox
        items={menu}
        variant="solid"
        className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[600px] overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
      >
        {(item) => (
          <ListboxItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            onClick={() => handleClick(item)}
          >
            <div className="flex flex-row items-start justify-center">
              <div className="flex flex-row ml-1 gap-1 justify-start">
                {item.icon}&nbsp;&nbsp;{item.label}
              </div>
              <div className="flex justify-end ml-auto">
                <MdOutlineNavigateNext
                  style={{ width: 24, height: 24, color: "#d7d7d7" }}
                />
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
};

export default MyPageMenu;

const styles = {
  icon: {
    width: 24,
    height: 24,
    color: "gray",
  },
};

export const Title = styled.span`
  margin-left: 16px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #242729;
`;

export const Wapper = styled.div`
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

export const MenuWapper = styled.div`
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

export const MenuBtn = styled.button`
  padding: 0 24px;
  display: block;
  width: 100%;
  height: 56px;
  background: #ffffff;
`;
