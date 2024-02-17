import React from "react";
import styled from "styled-components";
import {Tab, Tabs} from "@nextui-org/react";
import {HiOutlineHome} from "react-icons/hi2";
import {IoMdAddCircleOutline} from "react-icons/io";
import {HiOutlineChat} from "react-icons/hi";
import {FiUsers} from "react-icons/fi";
import {MdOutlineAutoMode} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    return (
        <BottomNav>
            <Tabs aria-label="Options" color="danger" variant="solid" radius="full" align="center">
                <Tab
                    value="home"
                    title={
                        <div className="flex items-center flex-col " onClick={ () => navigate('/')}>
                            <HiOutlineHome style={{...styles.icon}}/>
                        </div>
                    }
                    className="h-[50px] flex justify-center"
                ></Tab>
                <Tab
                    value="ai-weather"
                    title={
                        <div className="flex items-center flex-col " onClick={ () => navigate('/ai')}>
                            <MdOutlineAutoMode style={{...styles.icon}}/>
                        </div>
                    }
                    className="h-[50px] flex justify-center"
                ></Tab>
                <Tab
                    value="add"
                    title={
                        <div className="flex items-center flex-col " onClick={ () => navigate('/club-add') }>
                            <IoMdAddCircleOutline style={{...styles.icon}}/>
                        </div>
                    }
                    className="h-[50px] flex justify-center"
                ></Tab>
                <Tab
                    value="club"
                    title={
                        <div className="flex items-center flex-col" onClick={() => navigate('/club')}>
                            <FiUsers style={{...styles.icon}}/>
                        </div>
                    }
                    className="h-[50px] flex justify-center"
                ></Tab>
                <Tab
                    value="chatHeader"
                    title={
                        <div className="flex items-center flex-col ">
                            <HiOutlineChat style={{...styles.icon}}/>
                        </div>
                    }
                    className="h-[50px] flex justify-center"
                ></Tab>
            </Tabs>
        </BottomNav>
    );
};

export default Footer;

const styles = {
    icon: {
        width : 24,
        height: 24,
    },
}

const BottomNav = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  position: fixed;
  opacity: 90%;
  bottom: 10px;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 30;
`;
