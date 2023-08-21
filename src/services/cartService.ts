import api from "./api";

export const addToCart = async (productId: number, quantity: number): Promise<string | null> => {
    try {
        const response = await api.post(`http://localhost:7000/cart/add/${productId}`, {quantity: quantity});
        return response.data.message;
    } catch (error) {
        return null;
    }
}

export const updateCartItem = async (cartItemId: number, quantity: number): Promise<string | null> => {
    try {
        const response = await api.post(`http://localhost:7000/cart/update/${cartItemId}`, {quantity: quantity});
        return response.data.message;
    } catch (error) {
        return null;
    }
}

export const deleteCartItem = async (cartItemId: number): Promise<string | null> => {
    try {
        const response = await api.delete(`http://localhost:7000/cart/delete/${cartItemId}`);
        return response.data.message;
    } catch (error) {
        return null;
    }
}

export const deleteAllCartItems = async (): Promise<string | null> => {
    try {
        const response = await api.delete(`http://localhost:7000/cart/deleteAll`);
        return response.data.message;
    } catch (error) {
        return null;
    }
}