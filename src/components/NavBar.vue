<template>
    
    <div class="navbar">
        <div class="flex-box" style="padding-left: 15px;">
            <el-icon style="font-size: 25px;color: grey;justify-items: flex-start;" @click="changeCollapse"><Expand /></el-icon>
            <span class="word">导航栏</span>
        </div>
        <div class="flex-box">
            <img src="@/assets/user.jpg" alt="" style="height: 25px;padding-right: 10px;padding-top: 15px;border-radius: 25%;">
            <el-dropdown style="line-height: 60px;">
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown style="padding-right: 10px;">
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { adminStore } from '@/stores/admin';
const changeCollapse=()=>{
    adminStore().changeCollapse()
}
</script>
<style scoped>
.navbar{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    text-align: center;
    
}
.flex-box{
    justify-content: center;
    align-items: center;
    text-align: center;
}
.word{
    font-size: 25px;
    font-weight: bold;
    padding-left: 10px;
}
</style>