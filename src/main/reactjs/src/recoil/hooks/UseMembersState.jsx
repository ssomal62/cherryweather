import {atom, useRecoilValue, useSetRecoilState} from "recoil";
import axios from "axios";
import {useEffect} from "react";

export const membersState = atom({
    key    : 'membersState',
    default: [],
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
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
        console.log("멤버목록 호출 확인");
        if (clubId) {
            const fetchMembers = async () => {

                const requestData = {
                    "clubId"              : clubId,
                };

                try {
                    const response = await axios.post(`http://localhost:9002/api/membership/query`, requestData);
                    console.log('Success:', response);
                    setMembers(response.data.summaryList)

                } catch (error) {
                    console.error('멤버 목록을 불러오는데 실패했습니다.', error)
                }
            };

            fetchMembers();
        }

    },[clubId,setMembers]);

}
