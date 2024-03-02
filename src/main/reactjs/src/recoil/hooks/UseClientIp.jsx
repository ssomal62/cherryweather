import {useEffect, useState} from 'react';

const UseClientIp = () => {
    const [clientIp, setClientIp] = useState('');

    useEffect(() => {
        const fetchAndSendIp = async () => {
            try {
                const response = await fetch('http://ip-api.com/json');
                const data = await response.json();
                setClientIp(data.query);
            } catch (error) {
                console.error('Error fetching IP : ', error);
            }
        }
        fetchAndSendIp();
    }, []);

    return clientIp; // 클라이언트 IP 반환
};

export default UseClientIp;
