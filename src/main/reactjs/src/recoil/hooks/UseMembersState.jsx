import {atom, useSetRecoilState} from "recoil";
import {useEffect, useState} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";

export const membersState = atom({
    key             : 'membersState',
    default         : [],
    effects_UNSTABLE: [
        ({setSelf, onSet}) => {
            const savedValue = localStorage.getItem('membersState');
            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }

            onSet(newValue => {
                localStorage.setItem('membersState', JSON.stringify(newValue));
            });
        },
    ],
})

export const useMembersState = (clubId) => {
    const cookie = new Cookies();
    const setMembers = useSetRecoilState(membersState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            if (!clubId) return;

            const requestData = {
                clubId: clubId,
            };

            setLoading(true);
            setError(null);
            const accessToken = cookie.get('accessToken');
            console.log("⚠️[Club Member List] 호출을 시도합니다.");
            try {
                const response =
                    await instance.post('/membership/query', requestData, {
                        headers: {
                            ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {})
                        }
                    });
                console.log('✅[Club Member List] Success', response);
                setMembers(response.data.summaryList)
            } catch (error) {
                console.error('⛔[Club Member List] Failed', error)
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, [clubId, setMembers]);
    return {loading, error}
}
