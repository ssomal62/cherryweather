import React, { useEffect } from "react";
import {
  Container,
  IconWapper,
  Nav,
  TitleWapper,
} from "../../pages/user/MyPage";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "./MyPageMenu";
import Footer from "../../common/footer/Footer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  useFetchUserInfo,
  useModifyUserInfo,
  useUploadProfileImage,
  userInfoState,
} from "../../recoil/hooks/UseFetchUserInfo";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const ModifyProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { profileImage, profileName } = userInfo;
  const imagwUrl = `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${profileImage}?type=f&w=600&h=600&ttype=jpg`;
  const fetchUserInfo = useFetchUserInfo();
  const modifyUserInfo = useModifyUserInfo();
  useEffect(() => {
    fetchUserInfo();
  }, []);

  

  console.log(profileName);

  const uploadProfileImage = useUploadProfileImage();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      setUserInfo((prevState) => ({
        ...prevState,
        profileImage: file.name, // 응답에 따라 경로 수정 필요
      }));
      uploadProfileImage(file);
    }
  };
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
          <Title>프로필 수정</Title>
        </TitleWapper>
        <IconWapper></IconWapper>
      </Nav>
      <Container>
        <div>
          <label
            htmlFor="file-upload"
            style={{ display: "block", cursor: "pointer" }}
          >
            <FileImageWapper>
              <ProfileImg src={imagwUrl} alt="profile" />
            </FileImageWapper>
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-center items-center w-full mt-10">
          <div className="w-2/3">
            <Input
              type="text"
              label="닉네임"
              value={profileName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, profileName: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-full mt-5">
          <Button className="w-2/3" color="danger" onClick={modifyUserInfo}>수정하기</Button>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ModifyProfile;

const FileImageWapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  padding: 10px;
  align-items: center;
  justify-content: center;
  min-width: 220px;
  min-height: 220px;
  margin-top: 30px;
`;

const ProfileImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;
