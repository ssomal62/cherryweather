import styled from "styled-components";
import { Tab, Tabs } from "@nextui-org/react";
import { HiOutlineHome } from "react-icons/hi2";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineChat } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { MdOutlineAutoMode } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {


    return (
        <BottomNav>
            <Tabs aria-label="Options" color="danger" variant="solid" radius="full" align="center">
                <Tab
                    value="home"
                    title={
                        <div className="flex items-center flex-col ">
                            <HiOutlineHome style={{ ...styles.icon }} />
                        </div>
                    }
                    className="h-[50px] flex justify-center"
                ></Tab>
                <Tab
                    value="ai-weather"
                    title={
                        <div className="flex items-center flex-col ">
                            <MdOutlineAutoMode style={{ ...styles.icon }} />
                        </div>
                    }
                    className="h-[50px] flex justify-center"
                ></Tab>
                <Tab
                    value="add"
                    title={
                        <div className="flex items-center flex-col ">
                            <IoMdAddCircleOutline style={{ ...styles.icon }} />
                        </div>
                    }
                    className="h-[50px] flex justify-center"
                ></Tab>
                <Tab
                    value="club"
                    title={
                        <div className="flex items-center flex-col ">
                            <FiUsers style={{ ...styles.icon }} />
                        </div>
                    }
                    className="h-[50px] flex justify-center"
                ></Tab>

                <Tab
                    value="chat"
                    as={Link}
                    to="/chat"
                    title={
                        <div className="flex items-center flex-col ">
                            <HiOutlineChat style={{ ...styles.icon }} />
                        </div>

                    }

                    className="h-[50px] flex justify-center"
                >

                </Tab>

            </Tabs>
        </BottomNav>
    );
};

export default Footer;

const styles = {
    icon: {
        width: 24,
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
