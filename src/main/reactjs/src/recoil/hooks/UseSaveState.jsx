import {useRecoilState} from 'recoil';
import { atom } from 'recoil';
import {Cookies} from "react-cookie";
import {instance} from "../module/instance";

export const UseSaveState = atom({
    key: 'SaveImageState',
    default: [],
});


export const HeartFill = atom({
    key: 'saveFinished',
    default: false
});

export const useSaveImageState = () => {
    const [saveImage, setSaveImage] = useRecoilState(UseSaveState);
    const [heart, setHeart] = useRecoilState(HeartFill);
    const cookie = new Cookies();
    const toggleSaveImage = async (image_url) => {
        const isSaved = saveImage.includes(image_url);
        // 이미지가 저장되어 있지 않은 경우 이미지를 저장
        if (!isSaved) {
            // 서버에 좋아요 상태 변경 요청
            try {
                const token = cookie.get('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옵니다
                console.log("token:"+token);
                const config = {headers: { Authorization: `Bearer ${token}`}}
                const response = await instance.post('ai_image/save', {
                    imageURL:image_url
                }, config);
                if (response.bucketURL !== null) {
                    // 성공적으로 저장된 후에만 saveImage 초기화
                    alert("저장 완료되었습니다.");
                    setHeart(true);
                } else {
                    console.error('Save status update failed with status:', response.status);
                    alert("저장을 실패했습니다.");
                    setHeart(false);
                }
            } catch (error) {
                console.error('Save status update failed', error);
                setSaveImage([]);
            }
        }
    };

    return { toggleSaveImage };
};