import { Cookies } from "react-cookie";
import { atom } from "recoil";

// 리코일을 활용하여 전역으로 상태를 관리할 수 있음
// 로그인 상태는 팀원분들이 많이 필요할 것 같아 따로 만들어 놨습니다.
const cookies = new Cookies();

export const IsLoginAtom = atom({
    key: "isLogin",
    default: cookies.get("accessToken") ? true : false,
});
