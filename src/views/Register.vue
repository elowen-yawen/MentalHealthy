<template>
    <div class="content">
        <div class="title">
            <div class="flex-box" style="text-align: center;">
                <h2>创建您的账户</h2>
                <p>请填写注册信息</p>
            </div>
        </div>
        <div class="form-container" style="margin-top: 20px;">
            <el-form :rules="formRule" :model="formData" label-position="top" style="width: 400px;" ref="formRef">
                <el-form-item prop="username" label="用户名或邮箱" size="large">
                    <el-input v-model="formData.username" placeholder="请输入用户名或邮箱" />
                </el-form-item>
                <el-form-item prop="email" label="邮箱" size="large">
                    <el-input v-model="formData.email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item prop="nickname" label="昵称" size="large">
                    <el-input v-model="formData.nickname" placeholder="请输入昵称（可选）" />
                </el-form-item>
                <el-form-item prop="phone" label="手机号" size="large">
                    <el-input v-model="formData.phone" placeholder="请输入手机号（可选）" />
                </el-form-item>
                <el-form-item prop="password" label="密码" size="large">
                    <el-input v-model="formData.password" placeholder="请输入密码" type="password"/>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码" size="large">
                    <el-input v-model="formData.confirmPassword" placeholder="请输入确认密码" type="password"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="large" style="width: 400px;" @click="submitForm">创建账户</el-button>
            <p style="text-align: center;margin-top: 10px;">已有账户？<router-link to="/auth/login">立即登录</router-link></p>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { handleRegister } from '@/api/frontend';
import { useRouter } from 'vue-router';
const router=useRouter()
const formData = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 2,
    userType: 1,
    nickname: '',
    phone: ''
})
const formRule = reactive({
    username: [
        { required: true, message: '请输入你的用户名', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入你的邮箱', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入你的密码', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请输入确保两次输入的密码一致', trigger: 'blur' }
    ],
    // gender: [
    //     { required: true ,message: '请选择你的性别', trigger: 'blur' }
    // ]

})
const formRef = ref()
const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid, fields) => {
        handleRegister(formData.value).then(res => {
            if (res) {
                ElMessage.success('创建成功')
                router.push('/auth/login')
            } else {
                ElMessage.error('创建失败')
            }
        })
    })
}
</script>
<style lang="scss">
.container {
    width: 384px;

    .flex-box {
        display: flex;
        align-items: center;
    }

    .title {
        .title-text {
            text-align: center;

            h2 {
                font-size: 36px;
                margin-bottom: 10px;
            }

            p {
                font-size: 18px;
                color: #6b7280;
            }
        }
    }

    .form-container {
        margin-top: 30px;

        .btn {
            margin-top: 40px;
            width: 100%;
        }

        .footer {
            padding: 30px;
            text-align: center;
        }
    }
}
</style>