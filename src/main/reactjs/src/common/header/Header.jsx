import React, { useState } from 'react';
import styled from 'styled-components';
import mainImg from '../../assets/images/sun.png';

const Header = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };
    return (
        <>
            <Nav>
                <Container>
                    <Wapper>
                        <A><img alt='' src={mainImg} style={{width:'85px', height:'22px'}}/></A>
                        <SearchWapper>
                            <SearchInput placeholder='검색어 입력'>

                            </SearchInput>
                        </SearchWapper>
                        <Icon></Icon>
                    </Wapper>
                </Container>
            </Nav>
            <Menu>
                <MenuButton
                    isSelected={selectedButton === 0}
                    onClick={() => handleButtonClick(0)}
                >
                    <BtnText>홈</BtnText>
                </MenuButton>
                <MenuButton
                    isSelected={selectedButton === 1}
                    onClick={() => handleButtonClick(1)}
                >
                    <BtnText>모임</BtnText>
                </MenuButton>
                <MenuButton
                    isSelected={selectedButton === 2}
                    onClick={() => handleButtonClick(2)}
                >
                    <BtnText>날씨</BtnText>
                </MenuButton>
            </Menu>

        </>
    );
};

export default Header;

const BtnText = styled.div`
  color: ${(props) => (props.isSelected ? '#ffffff' : '#A1A9AD')};
  text-align: center;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  color: ${(props) => (props.isSelected ? '#ffffff' : '#A1A9AD')};
  text-align: center;
  height: 48px;
  background-color: ${(props) => (props.isSelected ? '#F0F0F0' : 'transparent')};
  &:hover {
    background-color: ${(props) => (props.isSelected ? '#transparent' : '#F0F0F0')};
  }
`;

const Menu = styled.div`
    width: 100%;
    padding: 0 16px;
    background: #FFFFFF;
    height: 48px;
    border-bottom: 0.5px solid #E8E9EB;
    display: flex;
    position: sticky;
    top: 52px;
    z-index: 20;
`;

const SearchInput = styled.input`
display: block;
margin: 0 4px;
padding: 0;
color: #242729;
border: none;
background: none;
caret-color: #FA6EE3;
width: 100%;
text-overflow: ellipsis;

`;

const Icon = styled.a`
color: inherit;
text-decoration: inherit;
display: flex;
margin: 0 0 0 auto;
-ms-flex-negative: 0;
flex-shrink: 0;
position: relative;
width: 32px;
height: 32px;

`;

const Nav = styled.nav`
    z-index: 2;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF
`;

const Container = styled.div`
max-width: 600px;
    margin: auto;
`;

const Wapper = styled.div`
height: 52px;
    background: #FFFFFF;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
`;

const A = styled.a`
color: inherit;
    text-decoration: inherit;
`;

const SearchWapper = styled.div`
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
background: #F5F6F8;
border-radius: 100px;
height: 32px;
padding: 0 12px 0 12px;
width: 100%;
margin: 0 20px 0 12px;
`;

