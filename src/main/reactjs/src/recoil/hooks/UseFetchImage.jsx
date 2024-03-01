import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useCallback, useEffect} from "react";
import {instance} from "../module/instance";
import {Cookies} from "react-cookie";
import {HeartFill} from "./UseSaveState";
import {promptState} from "./UseGptChat";
import {useFetchUserInfo, userInfoState} from "./UseFetchUserInfo";

export const imageURLState = atom({
    key: 'imageURLState',
    default: [],
});

export const useFetchImage = () => {
    const [prompt, setPrompt] = useRecoilState(promptState); // prompt 상태를 읽고 설정
    console.log("이미지 패치 훅 prompt : "+ prompt);
    const setImageURL = useSetRecoilState(imageURLState); // 값을 불러오기 위한 문법
    const cookie = new Cookies();
    const [heart, setHeart] = useRecoilState(HeartFill); // HeartFill 상태 사용
    // const fetchUserInfo = useFetchUserInfo();
    const userInfo = useRecoilValue(userInfoState);
    //
    // useEffect(() => {
    //     fetchUserInfo();
    //     console.log(userInfo)
    // }, []);


    return useCallback(async () => {
            let newPrompt = prompt;
            console.log(userInfo.gender);
        if (!newPrompt) {
            if (userInfo.gender === 'MALE') {
                newPrompt = "Create a diverse selection of East Asian men's fashion images that capture the essence of both modern and timeless styles." +
                    " Visualize an assortment of outfits suitable for various occasions, from relaxed campus wear to sharp formal attire, each complete with a detailed guide to help emulate the look." +
                    " The compositions should strike a balance between comfort and elegance, paying close attention to the harmonization of attire with accessories. Ensure the final visuals embody the style and quality typically seen in luxury men's fashion lookbooks.\n";
                setPrompt(newPrompt);
            } else if (userInfo.gender === 'FEMALE') {
                newPrompt = "Create a diverse selection of East Asian women's fashion images that capture the essence of both modern and timeless styles." +
                    " Envision a range of outfits appropriate for different settings, from casual daywear to sophisticated evening dresses, each accompanied by a unique guide to recreate the style. The images should balance ease and chic appeal, with a focus on detail that can inspire users looking for a wardrobe refresh." +
                    " Ensure the final visuals are in line with the elegance and finesse seen in high-end women's fashion lookbooks.\n";
                setPrompt(newPrompt);
            } else {
                newPrompt = "Create a diverse selection of fashion images that echo the essence of modern and timeless styles." +
                    " Imagine an assortment of ensembles suitable for various occasions, from casual campus wear to elegant evening attire," +
                    " each complete with a unique guide to emulate the look. The compositions should reflect a balance of comfort and sophistication," +
                    " with an eye for detail that can inspire users seeking a fresh wardrobe update." +
                    " Pay special attention to harmonizing the attire with accessories and ensuring the final visuals resonate with the style and quality seen in high-end fashion lookbooks." +
                    " Cater the generated outfits to be gender-inclusive, emphasizing versatility and personal expression in fashion.";
                setPrompt(newPrompt);
            }
        }
        try {

            setHeart(false);
            setImageURL([]); // 이미지 URL 상태 초기화

            const token = cookie.get('accessToken'); // 로컬 스토리지에서 JWT 토큰을 가져옵니다
            console.log("token:"+token);
            const config = {headers: { Authorization: `Bearer ${token}`}}

            // const response = await instance.post('ai_image/create',
            const response = await instance.post('/ai_image/create',
                {
                    model: "dall-e-3",
                    prompt: prompt,
                    size: "1024x1024"
                }, config
            );
            setImageURL(response.data.data[0].url);
            console.log("IMAGE_URL:"+response.data.data[0].url);
        } catch (error) {
            console.error('이미지 url을 불러오는데 실패했습니다.', error);
        }
    }, [setImageURL]);
};
