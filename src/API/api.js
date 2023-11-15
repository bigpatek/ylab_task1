import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: '',
    headers: {
        "API-KEY": ""
    }
}
)

export const authAPI = {
    login(email,password){
        return instance.post(``, {email,password});
    },
    logout(){
        return instance.delete(``)
    }
}