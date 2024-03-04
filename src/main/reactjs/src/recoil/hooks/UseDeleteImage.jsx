import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import {useCallback} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";
import {HeartFill} from "./UseSaveState";
import axios from "axios";

export const deleteState = atom({
    key: 'deleteState',
    default: false,
})

export const useDeleteImage  = () => {
    const setDeleteURL = useSetRecoilState(deleteState);

    const cookie = new Cookies();
    return useCallback(async (bucketURL) => {
        try {

            const token = cookie.get('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옵니다
            console.log("token:"+token);
            const config = {headers: { Authorization: `Bearer ${token}`}}

            const response = await instance.delete('/ai_image/delete',
                {
                    ...config,
                    data:{ imageURL:bucketURL}
                });

            // HTTP 상태 코드가 200보다 크고 300보다 작으면 성공으로 처리
            // if (response.status >= 200 && response.status < 300) {
            //     setDeleteURL(true);
            // } else {
            //     alert('이미지 삭제에 실패했습니다.');
            // }
        } catch (error) {
            console.error('이미지 url을 불러오는데 실패했습니다.', error);
        }
    }, [deleteState]);
};
