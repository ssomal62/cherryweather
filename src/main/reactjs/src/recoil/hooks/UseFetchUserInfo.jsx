import { atom, useRecoilState } from "recoil";
import { instance } from "../module/instance";
import { Cookies } from "react-cookie";
import { useCallback } from "react";
import { useNavigate } from "react-router";

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
    const navigate = useNavigate();

    const modifyUserInfo = useCallback(async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('accessToken')}`,
                },
            };
            const modifyInfoRequestDto = {
                accountId: userInfo.accountId,
                password: userInfo.password,
                profileName: userInfo.profileName,
                phoneNumber: userInfo.phoneNumber,
                profileImage: userInfo.profileImage,
                interests: userInfo.interests,
                activityAreas: userInfo.activityAreas,
                agreementGetNotified: userInfo.agreementGetNotified,
            };

            const response = await instance.patch('/account/my-info/modify', modifyInfoRequestDto, config);
            console.log('유저 정보 수정 성공', response.data);
            alert('유저 정보가 수정되었습니다.');
            setUserInfo(response.data);
            navigate("/mypage")
        } catch (error) {
            console.error('유저 정보 수정 실패', error);
        }
    }, [userInfo, setUserInfo, cookies]);

    return modifyUserInfo;
};

export const useUploadProfileImage = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const cookies = new Cookies();

    const uploadProfileImage = useCallback(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${cookies.get('accessToken')}`,
                },
            };
            const res = await instance.post('/account/profile-upload', formData, config);
            console.log('프로필 이미지 업로드 성공!', res.data);
            console.log(res)

            // 프로필 이미지 업데이트 후 사용자 상태 업데이트

        } catch (error) {
            console.error('프로필 이미지 업로드 실패 😢', error);
        }
    }, [setUserInfo, cookies]);

    return uploadProfileImage;
};