import service from "@/utils/request";
import { Header } from "element-plus/es/components/table-v2/src/components/index.mjs";
export function login(data){
    return service.post('/user/login',data)
}
export function categoryTree(){
    return service.get('/knowledge/category/tree')
}
export function articlePage(params){
    return service.get('/knowledge/article/page',{params})
}
export function handleImageHttpRequest(file,businessInfo){
   //formData用于文件传输,一般传输图片音频等，需要设置headers: { 'Content-Type': 'multipart/form-data' }。
    const formdata=new FormData()
    formdata.append('file',file)
    formdata.append('businessType','ARTICLE')
    formdata.append('businessId',businessInfo.businessId)
    formdata.append('businessField','cover')
    return service.post('/file/upload',params,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}