import {useEffect} from 'react';
import {atom, useSetRecoilState} from "recoil";
import {instance} from "../module/instance";

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
        console.log("⚠️[Club Detail] 호출을 시도합니다.");
        if (clubId) {
            const fetchClubDetail = async () => {
                try {
                    const response =
                        await instance.get(`/clubs/${clubId}`);
                    console.log("✅[Club Detail] Success", response)
                    setClub(response.data.clubDetail);
                } catch (error) {
                    console.error('⛔[Club Detail] Failed', error);
                }
            };

            fetchClubDetail();
        }
    }, [clubId, setClub]);
};


