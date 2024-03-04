import React, { useEffect } from "react";
import {
  Container,
  IconWapper,
  Nav,
  Title,
  TitleWapper,
} from "../../pages/user/MyPage";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import styled from "styled-components";
import { MenuBtn, MenuWapper, Wapper } from "./MyPageMenu";
import { MdKeyboardArrowRight } from "react-icons/md";
import {Switch, useDisclosure} from "@nextui-org/react";
import DropMadal from "./DropMadal";
import { useFetchUserInfo, userInfoState } from "../../recoil/hooks/UseFetchUserInfo";
import { useRecoilState } from "recoil";
import { instance } from "../../recoil/module/instance";
import { Cookies } from "react-cookie";
import PasswordUpdateModal from "./PasswordUpdateModal";

const MySetting = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const fetchUserInfo = useFetchUserInfo();
  const { agreementGetNotified } = userInfo;
  const {isOpen: dropIs, onOpen: dropOn, onOpenChange: dropChange} = useDisclosure();
  const {isOpen: updateIs, onOpen: updateOn, onOpenChange: updateChange} = useDisclosure();
  
  useEffect(() => {
    // 컴포넌트가 마운트 될 때만 fetchUserInfo를 호출합니다.
    fetchUserInfo();
  }, []);
  
  console.log(agreementGetNotified);

  const handleSwitchChange = async (newAgreementGetNotifiedValue) => {
    const updatedUserInfo = { ...userInfo, agreementGetNotified: newAgreementGetNotifiedValue };
    setUserInfo(updatedUserInfo); // 상태 업데이트
    await sumitAgreementGetNotified(updatedUserInfo); // 수정된 userInfo를 직접 전달
  };


    const sumitAgreementGetNotified = async (updatedUserInfo) => {
  try {
    const cookies = new Cookies();
    const config = {
      headers: {
        Authorization: `Bearer ${cookies.get('accessToken')}`,
      },
    };
    const response = await instance.patch(
      "/account/my-info/modify", updatedUserInfo, // 여기에 변경된 userInfo 사용
      config
    );
    console.log("알람 수신 동의 수정 성공", response.data);
  } catch (error) {
    console.error("알람 수신 동의 수정 실패", error);
  }
}
  
  return (
    <>
 
        <Nav>
          <div style={{ flex: "1px" }}>
            <IoArrowBack
              style={{ width: 30, height: 30, color: "black" }}
              onClick={() => navigate(-1)}
            />
          </div>
          <TitleWapper>
            <Title>설정</Title>
          </TitleWapper>
          <IconWapper onClick={() => navigate("/")}>
            <HomeIcon />
          </IconWapper>
        </Nav>
        <Container style={{marginTop: "50px"}}>
          <MenuBtn>
            <MenuWapper>
              <Wapper>
                {/* <GoBell style={{ ...styles.icon }} /> */}
                <Title> 알람 수신 동의</Title>
              </Wapper>
              <Wapper>
              <div className="flex gap-4">
                <Switch 
                isSelected = {agreementGetNotified}
                color="danger"
                onChange={() => handleSwitchChange(!agreementGetNotified)}
                style={{ ...styles.icon, marginRight:"10px", marginTop:"3px" }} 
                />
                </div>
              </Wapper>
            </MenuWapper>
          </MenuBtn>
          
          <MenuBtn onClick={updateOn}>
            <MenuWapper>
              <Wapper>
                <Title>비밀번호 변경</Title>
              </Wapper>
              <Wapper>
              <div className="flex gap-4">
                <MdKeyboardArrowRight defaultSelected color="danger" style={{ ...styles.icon }} />
                </div>
              </Wapper>
            </MenuWapper>
          </MenuBtn>
          <PasswordUpdateModal isOpen={updateIs} onOpenChange={updateChange}/>

          <MenuBtn onClick={dropOn}>
            <MenuWapper>
              <Wapper>
                <Title>회원 탈퇴</Title>
              </Wapper>
              <Wapper>
              <div className="flex gap-4">
                <MdKeyboardArrowRight defaultSelected color="danger" style={{ ...styles.icon }} />
                </div>
              </Wapper>
            </MenuWapper>
          </MenuBtn>
          <DropMadal isOpen={dropIs}  onOpenChange={dropChange}/>
        </Container>

    </>
  );
};

export default MySetting;

const styles = {
    icon: {
      width: 24,
      height: 24,
    },
  };

const HomeIcon = styled(HiOutlineHome)`
  display: -ms-flexbox;
  display: flex;
  margin: 0 0 0 auto;
  position: relative;
  width: 24px;
  height: 24px;
`;
