import api from "./api";

// Запрос на регистрацию
export const signup = async (data: {email: string, password: string, confirmPassword: string}) => {
    const body = {email: data.email, password: data.password}
    try {
        const response = await api.post(`http://localhost:7000/auth/signup`, body);
        return response.data.message;
    } catch (error) {
        return null;
    }
}

// Запрос на вход в аккаунт
export const signin = async (data: {email: string, password: string}): Promise<string | null> => {
    try {
        const response = await api.post(`http://localhost:7000/auth/signin`, data);
        return response.data.message;
    } catch (error) {
        return null;
    }
}

// Запрос на выход из аккаунта
export const logout = async () => {
    try {
        const response = await api.get(`/auth/logout`);
        return response.data.message;
    } catch (error) {
        return null;
    }
}

// Запрос на повторную отправку письма активации
export const retryActivate = async () => {
    try {
        const response = await api.get(`/auth/retry`);
        return response?.data.message;
    } catch (error) {
        return null;
    }
}

// Рефреш токенов 
export const refreshTokens = () => {
    return api.get('http://localhost:7000/auth/refresh');
};