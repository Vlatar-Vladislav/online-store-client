import axios, {AxiosError} from "axios"
axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'http://localhost:7000', // Замените на адрес вашего сервера
    withCredentials: true, // Включаем отправку куки с запросами
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
  
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;    
            try {
                await axios.get('http://localhost:7000/auth/refresh');
                // Если обновление токенов прошло успешно
                // Сохраните новые токены в куки или локальное хранилище
                // Например:
                // saveToken(response.data.access_token);
                // saveRefreshToken(response.data.refresh_token);
        
                // Повторите исходный запрос с обновленным аксесс токеном
                // originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                return api(originalRequest);
            } catch (error) {
            // Если обновление токенов также привело к ошибке (например, истек срок жизни рефреш токена),
            // обработайте этот случай и перенаправьте пользователя на страницу авторизации
            // например: window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
  
export default api;