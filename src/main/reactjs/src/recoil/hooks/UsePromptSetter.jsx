import {useRecoilState} from "recoil";
import {promptState} from "./UseGptChat";
import {useEffect, useState} from "react";

export const usePromptSetter = (gender) => {

// const [prompt, setPrompt] = useRecoilState(promptState);
const [generatedPrompt, setGeneratedPrompt] = useState(""); // useState를 추가하여 생성된 prompt를 관리

    useEffect(() => {
        let newPrompt = "";
        if (gender === 'MALE') {
            newPrompt = "Create a diverse selection of East Asian men's fashion images that capture the essence of both modern and timeless styles. Visualize an assortment of outfits suitable for various occasions, from relaxed campus wear to sharp formal attire, each complete with a detailed guide to help emulate the look.  The compositions should strike a balance between comfort and elegance, paying close attention to the harmonization of attire with accessories. Ensure the final visuals embody the style and quality typically seen in luxury men's fashion lookbooks.";
            // MALE에 대한 prompt 설정
        } else if (gender === 'FEMALE') {
            newPrompt =  "Create a diverse selection of East Asian women's fashion images that capture the essence of both modern and timeless styles.Envision a range of outfits appropriate for different settings, from casual daywear to sophisticated evening dresses, each accompanied by a unique guide to recreate the style. The images should balance ease and chic appeal, with a focus on detail that can inspire users looking for a wardrobe refresh. Ensure the final visuals are in line with the elegance and finesse seen in high-end women's fashion lookbooks.";
            // FEMALE에 대한 prompt 설정
        } else {
            newPrompt = "Create a diverse selection of fashion images that echo the essence of modern and timeless styles. Imagine an assortment of ensembles suitable for various occasions, from casual campus wear to elegant evening attire, each complete with a unique guide to emulate the look. The compositions should reflect a balance of comfort and sophistication, with an eye for detail that can inspire users seeking a fresh wardrobe update. Pay special attention to harmonizing the attire with accessories and ensuring the final visuals resonate with the style and quality seen in high-end fashion lookbooks. Cater the generated outfits to be gender-inclusive, emphasizing versatility and personal expression in fashion.";
            // 기타 상황에 대한 prompt 설정
        }
        // setPrompt(newPrompt);
        // setPrompt(newPrompt); // Recoil 상태 업데이트
        setGeneratedPrompt(newPrompt); // 로컬 상태 업데이트
    }, [gender]);

    return generatedPrompt;
}