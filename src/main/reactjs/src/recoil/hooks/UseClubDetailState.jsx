import {useCallback, useEffect} from 'react';
import {atom, useSetRecoilState} from "recoil";
import axios from "axios";

export const clubDetailState = atom({
    key    : 'clubDetailState',
    default: {},
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            const savedValue = localStorage.getItem('clubDetailState');
            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }

            onSet(newValue => {
                localStorage.setItem('clubDetailState', JSON.stringify(newValue));
            });
        },
    ],
})

export const useClubDetailState = (clubId) => {

    const setClub = useSetRecoilState(clubDetailState);

    useEffect(() => {

        console.log("클럽디테일 호출 확인");
        if (clubId) {
            const fetchClubDetail = async () => {
                try {
                    const response = await axios.get(`http://localhost:9002/api/clubs/${clubId}`);
                    setClub(response.data.clubDetail);
                } catch (error) {
                    console.error('클럽 상세 내용을 불러오는데 실패했습니다.', error);
                }
            };

            fetchClubDetail();
        }
    }, [clubId, setClub]);
};


