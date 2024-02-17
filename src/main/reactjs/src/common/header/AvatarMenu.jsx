import React from 'react';
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import p1 from "../../assets/images/club/person/5.jpg";
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IsLoginAtom } from '../../recoil/LoginAtom';
import { instance } from '../../recoil/module/instance';
import { userInfoState } from '../../recoil/hooks/UseFetchUserInfo';

const AvatarMenu = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useRecoilState(IsLoginAtom);
    const userInfo = useRecoilValue(userInfoState)
    const { profileName, email } = userInfo;

    // 로그아웃 함수
    const submitLogout = async () => {
        try {
            const requestBody = {
                accessToken: cookies.get("accessToken"),
            };
            const config = {
                headers: {
                    Authorization: `Bearer ${requestBody.accessToken}`,
                    'Content-Type': 'application/json'
                },
            };
        const res = await instance.delete("/auth/sign-out", { data : requestBody, ...config });
        console.log(res);
        cookies.remove("accessToken");
        setIsLogin(false);
        navigate("/");
        } catch (error) {
        console.error(error);
        }  
    }

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src={p1}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">{profileName}</p>
                    <p className="font-semibold">{email}</p>
                </DropdownItem>
                <DropdownItem key="mypage" onClick={()=> navigate("/mypage")}>마이 페이지</DropdownItem>
                <DropdownItem key="club">내모임</DropdownItem>
                {/* <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem> */}
                <DropdownItem key="settings">설정</DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={submitLogout}>
                    로그아웃
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AvatarMenu;
