import {useEffect, useState} from 'react';
import {atom, useSetRecoilState} from "recoil";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

export const clubDetailState = atom({
    key             : 'clubDetailState',
    default         : {
        clubDetail: {},
        liked     : false
    },
    effects_UNSTABLE: [
        ({setSelf}) => {
            const savedValue = localStorage.getItem('clubDetailState');
            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }
        },
    ],
})

export const useClubDetailState = (clubId) => {
    const cookie = new Cookies();
    const setClub = useSetRecoilState(clubDetailState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClubDetail = async () => {
            setLoading(true);
            setError(null);
            const accessToken = cookie.get('accessToken');
            console.log("⚠️[Club Detail] 호출을 시도합니다.");
            if (!clubId) return;
            try {
                const response =
                    await instance.get(`/clubs/${clubId}`, {
                        headers: {
                            ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {})
                        }
                    });
                console.log("✅[Club Detail] Success", response)
                setClub({
                    clubDetail: response.data.clubDetail,
                    liked     : response.data.liked
                });
            } catch (error) {
                console.error('⛔[Club Detail] Failed', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClubDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clubId, setClub]);

    return {loading, error};
};


