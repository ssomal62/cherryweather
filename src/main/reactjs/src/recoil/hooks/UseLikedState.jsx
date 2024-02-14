import {useRecoilState} from 'recoil';
import axios from 'axios';
import { atom } from 'recoil';

export const likedClubsState = atom({
    key: 'likedClubsState',
    default: [],
});

export const useLikeClub = () => {
    const [likedClubs, setLikedClubs] = useRecoilState(likedClubsState);

    const toggleLikeClub = async (clubId) => {
        const isLiked = likedClubs.includes(clubId);
        const updatedLikedClubs = isLiked
            ? likedClubs.filter(id => id !== clubId)
            : [...likedClubs, clubId];

        setLikedClubs(updatedLikedClubs);

        // 서버에 좋아요 상태 변경 요청
        try {
            await axios.post('/api/like', {
                clubId,
                liked: !isLiked,
            });
            // 성공 로직 (옵셔널)
        } catch (error) {
            console.error('Like status update failed', error);
            // 실패 시 좋아요 상태 원복 (옵셔널)
            setLikedClubs(likedClubs); // 요청 전 상태로 원복
        }
    };

    return { toggleLikeClub };
};
