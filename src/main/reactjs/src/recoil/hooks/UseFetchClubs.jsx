import {useCallback, useState} from "react";
import {atom, useSetRecoilState} from 'recoil';
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

export const clubListState = atom({
    key: 'clubListState',
    default: [],
});

export const useFetchClubs = () => {
    const cookie = new Cookies();
    const setClubList = useSetRecoilState(clubListState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [accessToken, setAccessToken] = useState(() => cookie.get('accessToken'));

    const fetchClubs = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await instance.get('/clubs', {
                headers: {
                    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
                }
            });
            console.log('✅[Club List] Success', response);
            setClubList(response.data.summaryList);
        } catch (error) {
            console.error('⛔[Club List] Failed', error);
            setError(error);
        } finally {
            setLoading(false);
        }

    }, [accessToken, setClubList]);

    return { fetchClubs, loading, error };
};
