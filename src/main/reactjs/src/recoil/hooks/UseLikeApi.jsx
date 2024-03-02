import {Cookies} from "react-cookie";
import {instance} from "../module/instance";

export const useLikeClub = () => {
    const cookie = new Cookies();

/**
 * 지정된 타입의 엔터티에 대해 '좋아요' 상태를 토글
 *
 * @param {'club' | 'feed' | 'member'} type - '좋아요'를 토글할 대상의 타입입니다.
 * @param {number} targetId - '좋아요'를 토글할 대상의 식별자입니다. 이 값은 클럽, 피드, 또는 멤버의 고유 ID값을 저장하면 됨.
 */
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
