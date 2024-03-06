import {useCallback, useEffect, useMemo, useState} from "react";
import {atom, useSetRecoilState} from "recoil";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

/**
 * 클럽 목록 상태를 관리하는 Atom.<p>
 * **response.data.summaryList**를 통해 접근해야 하는 데이터 구조입니다.
 *
 * 사용 가능한 URI:
 * - GET /clubs/list: 모든 클럽의 요약 정보를 가져옵니다.
 * - GET /clubs/query: 검색 쿼리에 따른 클럽의 요약 정보를 가져옵니다.
 */
export const clubListState = atom({
    key    : 'clubListState',
    default: [],
});

export const myClubListState = atom({
    key    : 'myClubListState',
    default: [],
});

export const searchClubListState = atom({
    key    : 'searchClubListState',
    default: [],
});

export const likedClubListState = atom({
    key    : 'likedClubListState',
    default: [],
});

/**
 * 클럽 상세 정보 상태를 관리하는 Atom.<p>
 * **response.data.clubDetail** : 해당 클럽 상세정보 <p>
 * **response.data.like** : 해당 클럽의 현재 유저 '좋아요' 상태<p>
 *
 * 사용 가능한 URI:
 * - GET /clubs/{clubId}: 해당 클럽의 상세 정보를 가져옵니다.
 */
export const clubDetailState = atom({
    key    : 'clubDetailState',
    default: {
        clubDetail: {},
        liked     : false,
        hostName: '',
        hostProfile:'',
    },
})

/* -------------------------------------------
    여기서부터 Club 데이터를 가져오는 커스텀 훅
--------------------------------------------- */

/**
 * @param method HTTP 요청 메소드 ('get', 'post', 'put', 'delete'). 기본값은 'get'.
 * @param state Recoil 상태(atom).
 * @param dynamicPath 요청 URL에 추가할 동적 경로.
 * @param requestBody HTTP 요청 본문. 기본값은 null.
 * @returns 로딩 상태와 에러 상태를 포함하는 객체.
 */
export const useClubData = ({method = 'get', state, dynamicPath, requestBody = null, refreshKey}) => {
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
            const url = `/clubs${dynamicPath}`;
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


            if (state.key === 'clubDetailState') {
                setState({
                    clubDetail: response.data.clubDetail,
                    liked     : response.data.liked,
                    hostName: response.data.hostName,
                    hostProfile:response.data.hostProfile,
                })
            } else if (state.key === 'likedClubListState') {
                setState(response.data);
            } else {
                setState(response.data.summaryList);
            }

        } catch (error) {
            console.error(`⛔[${state.key}] Failed`, error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [method, dynamicPath, requestBody, setState, cookie, state.key]);

    useEffect(() => {
        fetchData();
    }, [fetchData, refreshKey]);

    return {loading, error};
};
