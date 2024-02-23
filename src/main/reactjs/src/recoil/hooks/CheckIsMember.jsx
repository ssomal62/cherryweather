import {atom, useSetRecoilState} from 'recoil';
import {Cookies} from "react-cookie";
import {useEffect, useState} from "react";
import {instance} from "../module/instance";

export const isMemberState = atom({
    key    : 'isMemberState',
    default: null,
});

export const memberInfoState = atom({
    key    : 'memberInfoState',
    default: null,
});

export const useCheckMember = (clubId) => {

    const cookie = new Cookies();
    const setIsMember = useSetRecoilState(isMemberState);
    const setMemberInfo = useSetRecoilState(memberInfoState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('⚠️[IsMember] 호출을 시도합니다.');
        const fetchCheckMember = async () => {
            setLoading(true);
            setError(null);
            const accessToken = cookie.get('accessToken');
            try {
                const response =
                    await instance.get(`/membership/${clubId}`, {
                    headers: {
                        ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {})
                    }
                });
                console.log('✅[IsMember] Success', response);
                setMemberInfo(response.data.info);
                setIsMember(true);
            } catch (error) {
                console.error('⛔[IsMember] Failed', error);
                setMemberInfo(null);
                setIsMember(false);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (clubId) {
            fetchCheckMember();
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clubId, setIsMember, setMemberInfo]);

    return {loading, error};
}
