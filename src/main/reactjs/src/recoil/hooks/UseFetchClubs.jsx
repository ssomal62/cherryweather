import {atom, useSetRecoilState} from 'recoil';
import {useCallback} from "react";
import {instance} from "../module/instance";

export const clubListState = atom({
    key: 'clubListState',
    default: [],
});

export const useFetchClubs = () => {
    const setClubList = useSetRecoilState(clubListState); // 값을 불러오기 위한 문법

    return useCallback(async () => {
        console.log("⚠️[Club List] 조회를 시도합니다.")
        try {
            const response =
                await instance.get('/clubs');
            console.log('✅[Club List] Success', response);
            setClubList(response.data.summaryList);
        } catch (error) {
            console.error('⛔[Club List] Failed', error);
        }
    }, [setClubList]);
};
