<template>
    <div class="frontend-layout">
        <div class="navbar-container">
            <div class="brand-section">
                <img src="@/assets/机器人.png" alt="" style="width: 50px;
                height: 50px;">
                <div class="brand-name">
                    心理健康AI助手
                </div>
            </div>
            <div class="nav-section">
                <div class="nav-link">
                    <router-link to="/home">首页</router-link>
                </div>
                <template v-if="logIn">
                    <div class="nav-link">
                        <router-link to="/consulation">AI咨询</router-link>
                    </div>
                    <div class="nav-link">
                        <router-link to="emotion-diary">情绪日记</router-link>
                    </div>
                </template>
                <div class="nav-link">
                    <router-link to="knowledge">知识库</router-link>
                </div>
                <template v-if="!logIn">
                    <div class="nav-link">
                        <el-button @click="gotoLogin">登录</el-button>
                    </div>
                    <div class="nav-link">
                        <el-button type="primary" @click="gotoRegister">注册</el-button>
                    </div>
                </template>
                <template v-else>
                    <div class="nav-link">
                        <el-button @click="handleLogout">退出登录</el-button>
                    </div>
                </template>
            </div>
        </div>
        <router-view></router-view>
        <div class="footer-container">
            <div class="footer-bottom">
                @2026 心理健康AI助手.All rights reserved.
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Logout } from '@/api/admin.js'
import { ElMessageBox } from 'element-plus';
import ElMessage from 'element-plus';
const logIn = ref(true)
onMounted(() => {
    const token = localStorage.getItem('token')
    if (token) {
        logIn.value = true
    }
})
const router = useRouter()
const gotoLogin = () => {
    router.push('/auth/login')
}
const gotoRegister = () => {
    router.push('/auth/register')
}
const handleLogout = () => {
    ElMessageBox.confirm(
        '确定要退出登录吗',
        '注意',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    ).then(() => {
        Logout().then(res => {
            router.push('/auth/login')
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        })
    })
}
</script>
<style lang="scss">
.frontend-layout {
    background-color: #fff;

    .navbar-container {
        max-width: 1200px;
        height: 100%;
        margin: 0 auto;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .brand-section {
            display: flex;
            align-items: center;

            .brand-name {
                margin-left: 10px;
                font-size: 24px;
                font-weight: 600;
                color: #333;
            }
        }

        .nav-section {
            display: flex;
            align-items: center;
            gap: 40px;

            .nav-link {
                color: #4b5563;
                font-size: 16px;
                font-weight: 500;

                &:hover {
                    color: #4A90E2;
                }
            }
        }
    }

    .footer-container {
        background: #1f2937;
        color: white;
        padding: 15px 0;
        margin-top: auto;

        .footer-bottom {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 10px;
            text-align: center;
        }
    }
}
</style>