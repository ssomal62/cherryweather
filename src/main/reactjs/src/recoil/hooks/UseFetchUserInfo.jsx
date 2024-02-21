import { atom, useRecoilState } from "recoil";
import { instance } from "../module/instance";
import { Cookies } from "react-cookie";
import { useCallback } from "react";

export const userInfoState = atom({
    key: 'userInfo', 
    default: {},
  });

export const useFetchUserInfo = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const cookies = new Cookies();

    return useCallback(async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            };
            const res = await instance.get('/account/user-info', config);
            console.log("유저정보 호출 성공", res.data);
            setUserInfo(res.data);
        } catch (error) {
            console.error('유저정보 호출 실패', error);
        }
    }, [userInfo]);
}

export const useModifyUserInfo = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const cookies = new Cookies();

    const modifyUserInfo = useCallback(async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('accessToken')}`,
                },
            };
            const modifyInfoRequestDto = {
                password: userInfo.password,
                profileName: userInfo.profileName,
                phoneNumber: userInfo.phoneNumber,
                profileImage: userInfo.profileImage,
                interests: userInfo.interests,
                activityAreas: userInfo.activityAreas,
            };

            const response = await instance.patch('/my-info/modify', modifyInfoRequestDto, config);
            console.log('유저 정보 수정 성공', response.data);

            setUserInfo(response.data);
        } catch (error) {
            console.error('유저 정보 수정 실패', error);
        }
    }, [userInfo, setUserInfo, cookies]);

    return modifyUserInfo;
};