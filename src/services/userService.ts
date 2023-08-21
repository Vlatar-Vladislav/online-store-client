import api from "./api";

// !!! ОСНОВНЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ С ПОЛЬЗОВАТЕЛЕМ !!!
// Запрос на получение пользователя
export const getMe = async (): Promise<IUser | null> => {
    try {
        const response = await api.get('/users/me')
        return response.data
    } catch (error) {
        return null
    }
};

// !!! ФУНКЦИИ ДЛЯ РАБОТЫ С КОМЕНТАРИЯМИ !!!
// Добавить коментарий
export const addComment = async (productId: number, comment: {rating: number, comment: string, advantages?: string, disadvantages?: string}) => {
    try {
        const response = await api.post(`/users/comment/${productId}`, {...comment});
        return response.data.message;
    } catch (error) {
        return null;
    }
}
// Изменить коментарий
export const updateComment = async (commentId: number, comment: {rating?: number, comment?: string, advantages?: string, disadvantages?: string}) => {
    try {
        const response = await api.put(`/users/update_comment/${commentId}`, {...comment});
        return response.data.message;
    } catch (error) {
        return null;
    }
}
// Удалить коментарий
export const deleteComment = async (commentId: number) => {
    try {
        const response = await api.delete(`/users/delete_comment/${commentId}`);
        return response.data.message;
    } catch (error) {
        return null;
    }
}
// Получить все коментарии
export const getComments = async (productId: number) => {
    try {
        const response = await api.get(`/users/get_comments/${productId}`);
        return response.data;
    } catch (error) {
        return null;
    }
}


// !!! ФУНКИИ ДЛЯ РАБОТЫ С ИЗБРАННЫМИ ТОВАРАМИ !!!
// Добавление / Удаление товара из избранного
export const addFavoriteProducts = async (productId: number) => {
    try {
        const response = await api.post(`/users/favorite/${productId}`)
        return response.data.message
    } catch (error) {
        return null;
    }
}

// !!! ФУНКИИ ДЛЯ РАБОТЫ С СРАВНЕНИЕМ ТОВАРОВ !!!
// Добавление / Удаление товара из сравнения
export const addComparedProducts = async (productId: number) => {
    try {
        const response = await api.post(`/users/compared/${productId}`)
        return response.data.message
    } catch (error) {
        return null;
    }
}