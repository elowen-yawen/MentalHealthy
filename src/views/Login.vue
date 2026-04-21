<template>
    <div class="container">
        <div class="header">
            <span style="font-size: 15px;margin-bottom: 50px;">
                <el-icon>
                    <Back />
                </el-icon>
                返回主页</span>
            <h2 style="margin-top: 40px;font-weight: bold;">登录您的账户</h2>
            <p>请输入您的登录信息</p>
        </div>
        <div class="form">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="formData" :rules="rules" label-position="top">
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名称" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
                </el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    登录账户
                </el-button>
                <p style="margin-top: 10px;font-size: 15px;">还没有账户？<router-link to="/auth/register">去注册</router-link>
                </p>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { login } from '@/api/admin';
const ruleFormRef = ref()
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 2, message: '密码不能少于 6 位', trigger: 'blur' }
    ]
})
const formData = reactive({
    username: "",
    password: ""
})
const submitForm = async (formEl) => {
    if (!formEl) return;
    try {
        // 校验成功才会继续执行
        await formEl.validate();

        // 开始调用登录接口
        const data = await login(formData);

        if (data && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
            // 这里建议加一个路由跳转，比如：router.push('/')
        } else {
            console.error("登录失败：未获取到 token");
        }
    } catch (error) {
        // 校验失败会进入这里
        console.warn('表单校验未通过', error);
    }
};
</script>
<style>
.container {
    text-align: center;
    width: 60%;
    height: 70%;
}

.header {
    margin-bottom: 50px;
    position: relative;
}

.header p {
    font-size: 12px;
}

.header span {
    position: absolute;
    left: 0;
    top: -60px;
}

.el-button {
    width: 100%;
    margin-top: 20px;
}
</style>