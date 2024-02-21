import {atom, useSetRecoilState} from 'recoil';
import {Cookies} from "react-cookie";
import {useEffect} from "react";
import {instance} from "../module/instance";

export const isMemberState = atom({
    key    : 'isMemberState',
    default: null,
});

export const useCheckMember = (clubId) => {
    const cookie = new Cookies();
    const setIsMember = useSetRecoilState(isMemberState);

    useEffect(() => {
        console.log('⚠️[IsMember] 호출을 시도합니다.');
        const fetchCheckMember = async () => {
            try {
                const response =
                    await instance.get(`/membership/${clubId}`, {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`
                    }
                });
                console.log('✅[IsMember] Success', response);
                setIsMember(response.data);
            } catch (error) {
                console.error('⛔[IsMember] Failed', error);
                setIsMember(false);
            }
        };

        if (clubId) {
            fetchCheckMember();
        }
    }, [clubId, setIsMember]);
}
