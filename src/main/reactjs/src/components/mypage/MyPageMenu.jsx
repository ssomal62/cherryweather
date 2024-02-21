import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoAirplaneOutline } from "react-icons/io5";
import { TbJacket } from "react-icons/tb";

const MyPageMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <MenuBtn onClick={() => navigate("/club-add")}>
        <MenuWapper>
          <Wapper>
            <IoMdAddCircleOutline style={{ ...styles.icon }} />
            <Title>모임 만들기</Title>
          </Wapper>
          <Wapper>
            <MdKeyboardArrowRight style={{ ...styles.icon }} />
          </Wapper>
        </MenuWapper>
      </MenuBtn>
      <MenuBtn onClick={()=>navigate("/imageList")}>
        <MenuWapper>
          <Wapper>
            <TbJacket style={{ ...styles.icon }} />
            <Title>내 AI 코디</Title>
          </Wapper>
          <Wapper>
            <MdKeyboardArrowRight style={{ ...styles.icon }} />
          </Wapper>
        </MenuWapper>
      </MenuBtn>
      <MenuBtn>
        <MenuWapper>
          <Wapper>
            <FiMapPin style={{ ...styles.icon }} />
            <Title>활동 지역</Title>
          </Wapper>
          <Wapper>
            <MdKeyboardArrowRight style={{ ...styles.icon }} />
          </Wapper>
        </MenuWapper>
      </MenuBtn>
      <MenuBtn>
        <MenuWapper>
          <Wapper>
            <IoAirplaneOutline style={{ ...styles.icon }} />
            <Title>관심사</Title>
          </Wapper>
          <Wapper>
            <MdKeyboardArrowRight style={{ ...styles.icon }} />
          </Wapper>
        </MenuWapper>
      </MenuBtn>
    </>
  );
};

export default MyPageMenu;

const styles = {
  icon: {
    width: 24,
    height: 24,
  },
};

const IconWapper = styled.div``;

const Title = styled.span`
  margin-left: 16px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #242729;
`;

const Wapper = styled.div`
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const MenuWapper = styled.div`
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const MenuBtn = styled.button`
  padding: 0 24px;
  display: block;
  width: 100%;
  height: 56px;
  background: #ffffff;
`;
