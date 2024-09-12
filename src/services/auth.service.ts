import { $api2 } from "@/api/api";
import { MyStorage } from "@/utils/MyStorage";

class AuthService {
    async sendPhone(phone: string, setLoaded:(val:boolean) => void) {
        try {
            const {data} = await $api2.post('profile/confirm_phone', {
                phone: phone.replace(/\s/g, "").replace("+", "")
            }) 
            return data
        } catch (err:any) {
            setLoaded(true);
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async sendCode(code: string, phone:string) {
        try {
            const {data} = await $api2.post('profile/confirm_code', {
                code: code,
                phone: phone.replace(/\s/g, "").replace("+", ""),
                // password: 'password123',
                // email: 'artem.artem@gmail.ru',
                // first_name: 'Artem'
            }) 
            return data
        } catch (err:any) {
            throw new Error(err.response.data.detail ? err.response.data.detail : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async createUser(name: string, email:string, phone:string) {
        try {
            const {data} = await $api2.post('profile/createUser', {
                first_name: name,
                email: email,
                phone: phone.replace(/\s/g, "").replace("+", ""),
                password: 'password123',
            }) 
            MyStorage.set('refreshToken', `Bearer ${data.refresh_token}`)
            MyStorage.set('accessToken', `Bearer ${data.access_token}`)
            return data
        } catch (err:any) {
            throw new Error(err.response.data.detail ? err.response.data.detail : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async getBrands() {
        try {
            const {data} = await $api2.get('cars/car_brands') 
            
            return data.sort((a:any, b:any) => a.name.localeCompare(b.name))
        } catch (err:any) {
            throw new Error(err.response.data.detail ? err.response.data.detail : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async getModels(brand:any) {
        try {
            const {data} = await $api2.get(`cars/car_models/${brand}`) 
            return data.sort((a:any, b:any) => a.name.localeCompare(b.name))
        } catch (err:any) {
            throw new Error(err.response.data.detail ? err.response.data.detail : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async createCar(brand:any, model:any, gos:any, vin:any,) {
        try {
            const {data} = await $api2.post(`cars/create_car`, {
                brand: brand,
                model: model,
                vin: vin,
                license_plate: gos
            }) 
            return data
        } catch (err:any) {
            throw new Error(err.response.data.detail ? err.response.data.detail : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async editCar(props: {brand?:string, model?:any, license_plate?:string, vin?:string}, id:number) {
        try {
            const {data} = await $api2.patch(`cars/edit_car/${id}`, props) 
            return data
        } catch (err:any) {
            throw new Error(err.response.data.detail ? err.response.data.detail : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async getProfile() {
        try {
            const {data} = await $api2.get("profile")
            return data
        } catch (err:any) {
            throw new Error(err.response.data.detail ? err.response.data.detail : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
}

export const authService = new AuthService()