import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
});

// 1. 请求拦截器
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['token'] = token;
        }
        return config; // 必须返回 config
    },
    (error) => Promise.reject(error)
);

// 2. 响应拦截器 (注意这里改成 response 了！)
service.interceptors.response.use(
    (response) => {
        const { data, config } = response;

        // 业务状态码判断
        if (data.code === '200') {
            return data.data; // 返回接口实际数据
        }

        if (data.code === '-1') {
            ElMessage.error(data.msg || "登录过期，请重新登录");
            if (!config.url?.includes('login')) {
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                window.location.href = '/auth/login';
            }
            return Promise.reject(new Error(data.msg || "Error"));
        }

        // 兜底处理：如果 code 是其他值，也应该报错或返回
        ElMessage.error(data.msg || "未知错误");
        return Promise.reject(new Error(data.msg || "Unknown Error"));
    },
    (error) => {
        ElMessage.error("网络请求失败");
        return Promise.reject(error);
    }
);

export default service;