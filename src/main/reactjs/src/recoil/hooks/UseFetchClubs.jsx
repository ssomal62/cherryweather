import axios from 'axios';
import {atom, useSetRecoilState} from 'recoil';
import {useCallback} from "react";

export const clubListState = atom({
    key: 'clubListState',
    default: [],
});

export const useFetchClubs = () => {
    const setClubList = useSetRecoilState(clubListState); // 값을 불러오기 위한 문법

    return useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:9002/api/clubs');
            setClubList(response.data.summaryList);
        } catch (error) {
            console.error('클럽 리스트를 불러오는데 실패했습니다.', error);
        }
    }, [setClubList]);
};
