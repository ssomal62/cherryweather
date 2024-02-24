import {useCallback, useEffect, useState} from "react";
import {atom, useSetRecoilState} from "recoil";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

export const clubListState = atom({
    key: 'clubListState',
    default: [],
});

export const clubDetailState = atom({
    key             : 'clubDetailState',
    default         : {
        clubDetail: {},
        liked     : false
    },
})

export const useClubData = ({ method = 'get', state, dynamicPath, requestBody = null}) => {
    const cookie = new Cookies();
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
            const url = `/clubs${dynamicPath}`;
            const headers = {
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
            };


            switch(method.toLowerCase()) {
                case 'post':
                    response = await instance.post(url, requestBody,{headers});
                    break;
                case 'put':
                    response = await instance.put(url, requestBody,{headers});
                    break;
                case 'delete':
                    response = await instance.delete(url,{headers});
                    break;
                case 'get':
                default:
                    response = await instance.get(url,{headers});
                    break;
            }

            console.log(`✅[${state.key}] Success`, response);

            if (state.key === 'clubListState') {
                setState(response.data.summaryList);
            }

            if (state.key === 'clubDetailState') {
                setState({
                    clubDetail: response.data.clubDetail,
                    liked: response.data.liked
                });
            }

        } catch (error) {
            console.error(`⛔[${state.key}] Failed`, error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [method, dynamicPath, requestBody, setState]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { loading, error };
};
