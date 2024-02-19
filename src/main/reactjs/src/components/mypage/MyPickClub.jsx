import React from 'react';
import styled from "styled-components";
import club1 from "../../assets/images/club/culture/6.jpg";
import club2 from "../../assets/images/club/culture/7.jpg";


const MyPickClub = () => {
    return (
        <Container>
        <Title>찜한 모임</Title>
        <ClubWapper>
          <ClubWapperBtn>
            <ClubItem>
              <img
                src={club1}
                alt="Kakao login"
                style={{borderRadius: "20%"}}
              />
            </ClubItem>
          </ClubWapperBtn>
            <ClubWapperBtn>
                <ClubItem>
                    <img
                        src={club2}
                        alt="Kakao login"
                        style={{borderRadius: "20%"}}
                    />
                </ClubItem>
            </ClubWapperBtn>
        </ClubWapper>
      </Container>
    );
};

export default MyPickClub;

const ClubItem = styled.div`
  overflow-clip-margin: content-box;
  overflow: clip;
  height: 48px;
  aspect-ratio: auto 24 / 24;
  width: 48px;
  box-sizing: border-box;
  border-style: none;
`;

const ClubWapperBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border: none;
  cursor: pointer;
  text-decoration: none;
    margin-right: 8px; /* 버튼 사이의 간격 조절 */

`;

const ClubWapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    justify-content: flex-start; /* 여기를 수정해서 버튼이 바로 옆에 붙게 만듭니다. */
    margin-top: 8px;
`;

const Title = styled.h5`
  margin: 0;
  color: #212224;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0;
`;

const Container = styled.div`
  margin: 20px 0px 16px;
  border: 1px solid rgb(228, 229, 237);
  padding: 16px;
  border-radius: 8px;
`;

