import {useCallback, useEffect, useMemo, useState} from "react";
import {atom, useSetRecoilState} from "recoil";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

export const feedListState = atom({
    key    : 'feedListState',
    default: [],
});

export const feedDetailState = atom({
    key    : 'feedDetailState',
    default: {
        feedDetail: {},
        liked     : false
    },
})

/* -------------------------------------------
    여기서부터 Feed 데이터를 가져오는 커스텀 훅
--------------------------------------------- */

export const useFeedData = ({method = 'get', state, dynamicPath, requestBody = null}) => {
    const cookie = useMemo(() => new Cookies(), []);
    const setState = useSetRecoilState(state);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        console.log(`🔰[${state.key}] Try Access`);
        setLoading(true);
        setError(null);
        const accessToken = cookie.get('accessToken');

        try {
            let response;
            const url = `/feeds${dynamicPath}`;
            const headers = {
                ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {})
            };

            switch (method.toLowerCase()) {
                case 'post':
                    response = await instance.post(url, requestBody, {headers});
                    break;
                case 'put':
                    response = await instance.put(url, requestBody, {headers});
                    break;
                case 'delete':
                    response = await instance.delete(url, {headers});
                    break;
                case 'get':
                default:
                    response = await instance.get(url, {headers});
                    break;
            }

            console.log(`✅[${state.key}] Success`, response);

            setState(response.data);

        } catch (error) {
            console.error(`⛔[${state.key}] Failed`, error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [method, dynamicPath, requestBody, setState, cookie, state.key]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {loading, error};
};
