<template>

    <div class="navbar">
        <div class="flex-box" style="padding-left: 15px;">
            <el-icon style="font-size: 25px;color: grey;justify-items: flex-start;" @click="changeCollapse">
                <Expand />
            </el-icon>
            <span class="word">{{ route.meta.title }}</span>
        </div>
        <div class="flex-box">
            <img src="@/assets/user.jpg" alt=""
                style="height: 25px;padding-right: 10px;padding-top: 15px;border-radius: 25%;">
            <el-dropdown style="line-height: 60px;">
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown style="padding-right: 10px;">
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { adminStore } from '@/stores/admin';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import {Logout} from '@/api/admin.js'
const route = useRoute()
const router = useRouter()
const changeCollapse = () => {
    adminStore().changeCollapse()
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
            ElMessage({
                type: 'success',
                message: '登出成功',
            })
        })
    })
}
</script>
<style scoped>
.navbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    text-align: center;

}

.flex-box {
    justify-content: center;
    align-items: center;
    text-align: center;
}

.word {
    font-size: 25px;
    font-weight: bold;
    padding-left: 10px;
}
</style>