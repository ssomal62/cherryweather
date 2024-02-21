import {atom, useSetRecoilState} from "recoil";
import {useEffect} from "react";
import {instance} from "../module/instance";

export const membersState = atom({
    key             : 'membersState',
    default         : [],
    effects_UNSTABLE: [
        ({setSelf, onSet}) => {
            const savedValue = localStorage.getItem('membersState');
            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }

            onSet(newValue => {
                localStorage.setItem('membersState', JSON.stringify(newValue));
            });
        },
    ],
})

export const useMembersState = (clubId) => {

    const setMembers = useSetRecoilState(membersState);

    useEffect(() => {
        console.log("⚠️[Club Member List] 호출을 시도합니다.");
        if (clubId) {
            const fetchMembers = async () => {

                const requestData = {
                    "clubId": clubId,
                };

                try {
                    const response =
                        await instance.post('/membership/query', requestData);
                    console.log('✅[Club Member List] Success', response);
                    setMembers(response.data.summaryList)

                } catch (error) {
                    console.error('⛔[Club Member List] Failed', error)
                }
            };

            fetchMembers();
        }

    }, [clubId, setMembers]);

}
