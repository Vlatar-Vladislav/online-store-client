import api from "./api";

export const createOrder = async () => {
    try {
        const response = await api.get(`http://localhost:7000/orders/create`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export const createOrderAgain = async (data: {id: number, quantity: number}[]) => {
    try {
        const response = await api.post(`http://localhost:7000/orders/createAgain`, {
            data: data
        });
        return response.data;
    } catch (error) {
        return null;
    }
}