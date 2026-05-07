import service from "@/utils/request";
export function handleRegister(data){
    return service.post('/user/add',data)
}