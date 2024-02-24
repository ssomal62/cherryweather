import {useEffect} from 'react';

const useClientIp = () => {

    useEffect(() => {
        const fetchAndSendIp = async () => {
            try {
                const response = await fetch('http://ip-api.com/json');
                const data = await response.json();
                const clientIp = data.query;

                //ip를 백엔드로 전송
                await fetch('/api/geolocation/reqlocation', {
                    method : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ip: clientIp}),
                });

                await fetch('/api/geolocation/reslocation', {
                    method : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ip: clientIp}),
                });

                await fetch('/api/weather/daylight', {
                    method : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ip: clientIp}),
                });

                await fetch('/api/weather/now', {
                    method : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ip: clientIp}),
                });

                await fetch('/api/weather/now/info', {
                    method : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ip: clientIp}),
                });


                console.log('data : ', data, ' / ClientIp : ', clientIp);
            } catch (error) {
                console.error('Error fetching or sending IP : ', error);
            }
        }
        fetchAndSendIp();
    }, []);
};

export default useClientIp;
