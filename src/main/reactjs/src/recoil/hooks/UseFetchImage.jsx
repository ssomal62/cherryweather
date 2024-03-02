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

    // useEffect(() => {
    //     fetchUserInfo();
    //     console.log(userInfo)
    // }, []);


    return useCallback(async () => {
        let newPrompt = prompt;
        if (!newPrompt) {
                newPrompt = "Yes, I can provide a style guide for Casual Street Style. Let's create an informative style guide depicting casual street fashion. The guide features a stylish East Asian woman dressed in a comfortable yet chic ensemble suitable for the cool weather. She is adorned in a cozy oversized knit sweater🧥, distressed denim jeans👖, and stylish sneakers👟. The look is completed with a trendy crossbody bag👜 and oversized sunglasses🕶️ to add a touch of urban flair. This outfit is perfect for a casual day out in the city or a laid-back hangout with friends. How does that sound to you? If you have any specific preferences or would like to see more examples, feel free to let me know! 😊";
                setPrompt(newPrompt);
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