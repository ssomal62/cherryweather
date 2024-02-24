import {Cookies} from "react-cookie";
import {instance} from "../module/instance";

export const useLikeClub = () => {
    const cookie = new Cookies();

    const toggleLikeClub = async ({type, targetId}) => {
        try {
            //console.log("⚠️[Like] 토글 시도")
            await instance.post('/likes', {
                type,
                targetId,
            }, {
                headers: {
                    Authorization: `Bearer ${cookie.get('accessToken')}`
                }
            });
            //console.log('✅[Like] 토글 성공');
        } catch (error) {
            console.error('⛔[Like] 토글 실패', error);
        }
    };
    return {toggleLikeClub};
};
