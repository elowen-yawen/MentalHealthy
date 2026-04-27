import service from "@/utils/request";
export function login(data) {
    return service.post('/user/login', data)
}
export function categoryTree() {
    return service.get('/knowledge/category/tree')
}
export function articlePage(params) {
    return service.get('/knowledge/article/page', { params })
}
export function handleImageHttpRequest(file, businessInfo) {
    //formData用于文件传输,一般传输图片音频等，需要设置headers: { 'Content-Type': 'multipart/form-data' }。
    const formdata = new FormData()
    formdata.append('file', file)
    formdata.append('businessType', 'ARTICLE')
    formdata.append('businessId', businessInfo.businessId)
    formdata.append('businessField', 'cover')
    return service.post('/file/upload', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
export function handleNewArticle(formData) {
    return service.post('/knowledge/article', formData)
}

export function handleUpdateArticle(id, data) {
    return service.put(`/knowledge/article/${id}`, data)
}

export function handleDeleteArticle(id) {
    return service.delete(`/knowledge/article/${id}`)
}

export function handleGetConsultation(data){
    return service.get('/psychological-chat/sessions',{params:data})
}

export function handleGetSessionMessage(id){
    return service.get(`/psychological-chat/sessions/${id}/messages`)
}
export function handleEmotionPage(data){
    return service.get('/emotion-diary/admin/page',{params:data})
}

export function handleRemoveEmotion(id){
    return service.delete(`/emotion-diary/admin/${id}`)
}