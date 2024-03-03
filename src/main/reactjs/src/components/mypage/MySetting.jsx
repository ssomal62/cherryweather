import React, {useEffect} from "react";
import {Container, IconWapper, Nav,} from "../../pages/user/MyPage";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {HiOutlineHome} from "react-icons/hi2";
import styled from "styled-components";
import {MdOutlineNavigateNext} from "react-icons/md";
import {Divider, Listbox, ListboxItem, Switch, useDisclosure} from "@nextui-org/react";
import DropMadal from "./DropMadal";
import {useFetchUserInfo, userInfoState} from "../../recoil/hooks/UseFetchUserInfo";
import {useRecoilState} from "recoil";
import {instance} from "../../recoil/module/instance";
import {Cookies} from "react-cookie";
import PasswordUpdateModal from "./PasswordUpdateModal";

const MySetting = () => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const fetchUserInfo = useFetchUserInfo();
    const {agreementGetNotified} = userInfo;
    const {isOpen: dropIs, onOpen: dropOn, onOpenChange: dropChange} = useDisclosure();
    const {isOpen: updateIs, onOpen: updateOn, onOpenChange: updateChange} = useDisclosure();

    useEffect(() => {
        // 컴포넌트가 마운트 될 때만 fetchUserInfo를 호출합니다.
        fetchUserInfo();
    }, []);

    console.log(agreementGetNotified);

    const handleSwitchChange = async (newAgreementGetNotifiedValue) => {
        const updatedUserInfo = {...userInfo, agreementGetNotified: newAgreementGetNotifiedValue};
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
                <div style={{flex: "1px"}}>
                    <IoArrowBack
                        style={{width: 30, height: 30, color: "black"}}
                        onClick={() => navigate(-1)}
                    />
                </div>
                <div style={styles.title}>사용자 설정</div>
                <IconWapper onClick={() => navigate("/")}>
                    <HomeIcon/>
                </IconWapper>
            </Nav>
            <Divider style={{maxWidth: '600px', margin: 'auto'}}/>
            <Container style={{marginTop: 20, padding: 20}}>

                <Listbox
                    variant="solid"
                    className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[600px] overflow-visible shadow-small rounded-medium"
                    itemClasses={{
                        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                    }}>
                    <ListboxItem
                        color="default"
                        className='h-16'
                        onClick={() => handleSwitchChange(!agreementGetNotified)}
                    >
                        <div className="flex flex-row items-start justify-center">
                            <div className="flex flex-row ml-1 gap-1 justify-start">
                                알람 수신 동의
                            </div>
                            <div className="flex justify-end ml-auto">
                                <Switch
                                    isSelected={agreementGetNotified}
                                    color="danger"
                                    onChange={() => handleSwitchChange(!agreementGetNotified)}
                                />
                            </div>
                        </div>
                    </ListboxItem>
                    <ListboxItem
                        className='h-16'
                        color="default"
                        onClick={updateOn}
                    >
                        <div className="flex flex-row items-start justify-center">
                            <div className="flex flex-row ml-1 gap-1 justify-start">
                                비밀번호 변경
                            </div>

                            <div className="flex justify-end ml-auto">
                                <MdOutlineNavigateNext
                                    style={{width: 24, height: 24, color: "#d7d7d7"}}
                                />
                            </div>
                        </div>
                    </ListboxItem>
                    <ListboxItem
                        className='h-16'
                        color="default"
                        onClick={dropOn}
                    >
                        <div className="flex flex-row items-start justify-center">
                            <div className="flex flex-row ml-1 gap-1 justify-start">
                                회원 탈퇴
                            </div>
                            <div className="flex justify-end ml-auto">
                                <MdOutlineNavigateNext
                                    style={{width: 24, height: 24, color: "#d7d7d7"}}
                                />
                            </div>
                        </div>
                    </ListboxItem>
                </Listbox>
                <DropMadal isOpen={dropIs} onOpenChange={dropChange}/>
                <PasswordUpdateModal isOpen={updateIs} onOpenChange={updateChange}/>
            </Container>
        </>
    );
};

export default MySetting;

const styles = {
    title: {
        fontSize  : '18px',
        fontWeight: '600',
    }
}


const HomeIcon = styled(HiOutlineHome)`
  display: -ms-flexbox;
  display: flex;
  margin: 0 0 0 auto;
  position: relative;
  width: 24px;
  height: 24px;
`;


