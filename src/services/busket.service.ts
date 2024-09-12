import { $api2 } from "@/api/api";

class BasketService {
    async getBusket() {
        try {
            const {data} = await $api2.get(`basket`) 
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async patchNewProduct(obj:any, id:any) {
        try {
            const {data} = await $api2.patch(`basket/${id}`, obj)
            return data
        } catch (err:any) {
            throw new Error(err);
        }
    }
    async postNewProduct(obj:any) {
        try {
            const {data} = await $api2.post(`basket/`, obj)
            return data
        } catch (err:any) {
            throw new Error(err);
        }
    }
    async pinAllProducts() {
        try {
            const {data} = await $api2.post(`online/pin_all`)
            return data
        } catch (err:any) {
            throw new Error(err);
        }
    }
    async clearBasket() {
        try {
            const {data} = await $api2.post(`online/clear_basket`)
            return data
        } catch (err:any) {
            throw new Error(err);
        }
    }
}

export const basketService = new BasketService()