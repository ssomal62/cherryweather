import {atom, useSetRecoilState} from "recoil";
import {useCallback, useEffect, useMemo, useState} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

/**
 * 현재 클럽의 가입된 모든 멤버들의 멤버십 정보 목록을 관리하는 Atom.
 * 이 상태는 특정 클럽에 가입한 모든 사용자의 멤버십 정보를 배열 형태로 저장합니다.
 *
 * <사용 가능한 URI>
 * - GET /membership/{clubId}/memberships: 특정 클럽에 가입된 모든 멤버의 멤버십 정보를 가져옵니다.
 */
export const currentClubMembershipInfoState = atom({
    key :'currentClubMembershipInfoState',
    default:{
        summaryList:[],
    },
})

/**
 * 사용자가 가입한 모든 클럽의 멤버십 목록을 관리하는 Atom.
 * 이 상태는 사용자가 가입한 모든 클럽의 멤버십 정보를 배열 형태로 저장합니다.
 *
 * <사용 가능한 URI>
 * - GET /membership/my-memberships: 현재 사용자가 가입한 모든 클럽의 멤버십 정보를 가져옵니다.
 */
export const joinedMembershipState = atom({
    key :'joinedMembershipState',
    default:{
        summaryList:[],
    },
})

/**
 * 사용자가 현재 활성화하고 있는 클럽의 멤버십 정보를 관리하는 Atom.
 * 이 상태는 사용자가 현재 선택하거나 활성화하고 있는 클럽의 멤버십 상세 정보를 저장합니다.
 *
 * <사용 가능한 URI>
 * - GET /membership/{clubId}/member: 현재 사용자의 특정 클럽에 대한 멤버십 상세 정보를 가져옵니다.
 */
export const currentMembershipState = atom({
    key : 'currentMembershipState',
    default : {},
})

/* -------------------------------------------
   여기서부터 Membership 데이터를 가져오는 커스텀 훅
--------------------------------------------- */

/**
 * @param method HTTP 요청 메소드 ('get', 'post', 'put', 'delete'). 기본값은 'get'.
 * @param state Recoil 상태(atom).
 * @param dynamicPath 요청 URL에 추가할 동적 경로.
 * @param requestBody HTTP 요청 본문. 기본값은 null.
 * @returns 로딩 상태와 에러 상태를 포함하는 객체.
 */
export const useMembershipData = ({ method = 'get', state, dynamicPath, requestBody = null, refreshKey}) => {
    const cookie = useMemo(() => new Cookies(), []);
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
    }, [method, dynamicPath, requestBody, setState, cookie, state.key]);

    useEffect(() => {
        fetchData();
    }, [fetchData, refreshKey]);

    return {  loading, error }
}
