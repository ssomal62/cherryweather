import {atom, useRecoilValue, useSetRecoilState} from "recoil";
import {useEffect} from "react";
import {Cookies} from "react-cookie";
import {IsLoginAtom} from "../LoginAtom";
import {instance} from "../module/instance";

export const myMembership = atom({
    key             : 'myMembership',
    default         : [],
    effects_UNSTABLE: [
        ({setSelf, onSet}) => {
            const savedValue = localStorage.getItem('myMembership');
            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }

            onSet(newValue => {
                localStorage.setItem('myMembership', JSON.stringify(newValue));
            });
        },
    ],
})

export const useMyMembership = () => {

    const isLogin = useRecoilValue(IsLoginAtom);
    const cookie = new Cookies();
    const setMyMembership = useSetRecoilState(myMembership);

    useEffect(() => {

        if (isLogin) {

            console.log("⚠️[MyMembership List] 호출을 시도합니다.")
            const fetchMyMembership = async () => {

                try {
                    const response =
                        await instance.get('/membership/accounts', {
                        headers: {
                            Authorization: `Bearer ${cookie.get('accessToken')}`
                        }
                    });

                    console.log('✅[MyMembership List] Success', response);
                    setMyMembership(response.data.summaryList)

                } catch (error) {
                    console.error('⛔[MyMembership List] Failed', error)
                }
            };
            fetchMyMembership();
        }
    }, [setMyMembership]);

}
