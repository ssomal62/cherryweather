import {atom, useSetRecoilState} from "recoil";
import {useCallback, useEffect, useState} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

//현재 클럽의 가입된 모든 멤버들의 멤버쉽 정보 목록
export const currentClubMembershipInfoState = atom({
    key :'currentClubMembershipInfoState',
    default:[],
})

// 사용자가 가입한 모든 클럽의 멤버십 목록
export const joinedMembershipState = atom({
    key :'joinedMembershipState',
    default:[],
})

// 사용자가 현재 활성화하고 있는 클럽의 멤버십 정보
export const currentMembershipState = atom({
    key : 'currentMembershipState',
    default : {},
})


export const useMembershipData = ({ method = 'get', state, dynamicPath, requestBody = null}) => {
    const cookie = new Cookies();
    const setState = useSetRecoilState(state);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback( async () => {
        console.log(`🔰[${state.key}] Try Access`);
        setLoading(true);
        setError(null);
        const accessToken = cookie.get('accessToken');

        try {
            let response;
            const url = `/membership${dynamicPath}`;
            const headers = {
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
            };

            switch(method.toLowerCase()) {
                case 'post':
                    response = await instance.post(url, requestBody, { headers });
                    break;
                case 'put':
                    response = await instance.put(url, requestBody, { headers });
                    break;
                case 'delete':
                    response = await instance.delete(url, { headers });
                    break;
                case 'get':
                default:
                    response = await instance.get(url, { headers });
                    break;
            }

            console.log(`✅[${state.key}] Success`, response);
            setState(response.data);

        } catch (error) {
            if(state.key === 'currentMembershipState') {
                console.error(`⚠️[${state.key}] Not a member`, error);
                setState(null)
                setError(null);
                return
            }
            console.error(`⛔[${state.key}] Failed`, error);
            setError(null);
        } finally {
            setLoading(false);
        }
    }, [method, dynamicPath, requestBody, setState]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {  loading, error }
}
