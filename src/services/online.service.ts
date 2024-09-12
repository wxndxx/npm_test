import { $api2 } from "@/api/api";

class OnlineService {
    async getCataloge() {
        try {
            const {data} = await $api2.get('online/catalog') 
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async getProduct({id, page, sum, populate}:{id:string, page?:string, sum?:number, populate?:number}) {
        try {
            const {data} = await $api2.get(page ? 
                `/online/catalog_product/${id}?page=${page}${sum === 1 ? '&sum=1' : '&sum=0'}${populate === 1 ? '&populate=1' : '&populate=0'}`
                : `/online/catalog_product/${id}?sum=0&populate=0`) 
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async searchProduct({val, page}:{val:string, page?:string, sum?:number, populate?:number}) {
    // async searchProduct() {
        const url = page ? `/online/search?page=${page}` :
        `/online/search?page=1`
        try {
            debugger
            const {data} = await $api2.post(url, {
                search: val
            })
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async getAppointmentUser(id:string) {
            try {
                const {data} = await $api2.get(`/online/getAppointmentUser/${id}`)
                return data
            } catch (err:any) {
                throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
            }
        }
    async getComments() {
        try {
            const {data} = await $api2.get(`/online/comments/`)
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async getMainImages() {
        try {
            const {data} = await $api2.get(`/online/main_images`)
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async getReviews() {
        try {
            const {data} = await $api2.get(`/online/reviews/`)
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async createOrder() {
        try {
            const {data} = await $api2.post(`/online/createOrder`)
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async pinAll() {
        try {
            const {data} = await $api2.post(`/online/pin_all`)
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async unPinAll() {
        try {
            const {data} = await $api2.post(`/online/unpin_all`)
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
}

export const onlineService = new OnlineService()