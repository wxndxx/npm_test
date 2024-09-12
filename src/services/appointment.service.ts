import { $api2 } from "@/api/api";

class AppointmentService {
    async getAllNotifications() {
        try {
            const {data} = await $api2.get(`appointment/getAllNotifications`) 
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async getMyOrders() {
        try {
            const {data} = await $api2.get(`my_orders`) 
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async createAppointment(car:any) {
        try {
            const {data} = await $api2.post(`/online/createAppointment`, car)
            return data
        } catch (err:any) {
            //console.log(err.response.data.error)
            throw new Error(err);
        }
    }
    async createService(appointment?:any) {
        try {
            const {data} = await $api2.post(`/online/createOrder`, appointment)
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
    async readAllNotifications() {
        try {
            const {data} = await $api2.get(`/appointment/notifications_read_all`)
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
}

export const appointmentService = new AppointmentService()