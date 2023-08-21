import api from "./api";

// Проверка занят ли заданный email (для форм)
export const checkEmail = async (email: string) => {
    try {
        const response = await api.get(`http://localhost:7000/auth/checkEmail/${email}`);
        return response.data.message;
    } catch (error) {
        return null;
    }
}

// Проверка пароля (для форм)
export const checkPassword = async (email: string, password: string) => {
    try {
        const response = await api.get(`http://localhost:7000/auth/checkPassword/${email}/${password}`);
        return response.data.message;
    } catch (error) {
        return null;
    }
}