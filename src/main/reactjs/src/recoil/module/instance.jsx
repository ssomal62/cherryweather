import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});

instance.interceptors.response.use(
  response => response, // 정상 응답 처리
  async error => {
    const originalRequest = error.config;
    // 401 에러와 특정 메시지 확인
    if (error.response.status === 403) {
      try {
        // `/re-issue` 엔드포인트로 통신하여 새 토큰 발급 받기
        const { data } = await instance.post('/auth/re-issue', {
          accessToken : cookies.get('accessToken'),
        }, { withCredentials: true });
        
        // 새로운 액세스 토큰을 쿠키에 저장
        cookies.set('accessToken', data.accessToken, { expires: 1, path: '/' });

        // 원래 요청에 새 토큰을 설정하고 재요청
        instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return instance(originalRequest); // 수정된 요청으로 재요청
      } catch (reissueError) {
        console.error('Token reissue failed', reissueError);
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);
