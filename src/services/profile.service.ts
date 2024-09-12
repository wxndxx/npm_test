import { $api2 } from "@/api/api";

class ProfileService {
    async changeProfile(first_name: string, email: string) {
        let res = []
        first_name && res.push({first_name: first_name})
        email && res.push({email: email})
        const obj = res.reduce((acc, item) => {
            return { ...acc, ...item };
          }, {});

        try {
            const {data} = await $api2.patch('profile/', obj) 
            return data
        } catch (err:any) {
            throw new Error(err.response.data.status_text ? err.response.data.status_text : 'Пожалуйста, введите действительный номер телефона в формате +7 (XXX) XXX-XX-XX.');
        }
    }
}

export const profileService = new ProfileService()