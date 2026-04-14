<template>
    <el-aside width="470px">
        <el-col :span="12" style="text-align: center;height: 100%;">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                style="height: 100%;">
                <div class="container">
                    <img src="@/assets/机器人.png" alt="" style="height: 50px;width: 50px;">
                    <div class="aside">
                        <h3 style="font-size: 20px;font-weight: bold;color: #1f2937;">心理健康AI助手</h3>
                        <span style="font-size: 14px;color: #6b7280;">管理后台</span>
                    </div>
                </div>
                <el-menu-item v-for="p in menu" :v-key="p.path" :index="p.path" style="padding-left: 30px;">
                    <el-icon>
                        <component :is="p.meta.icon"></component>
                    </el-icon>
                    <span style="color: inherit !important;text-decoration: none !important;">
                        <router-link :to="'/back/' + p.path">{{ p.meta.title }}</router-link>
                    </span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-aside>
</template>
<script setup>
import { el } from 'element-plus/es/locale/index.mjs';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
const route = useRouter()
const menu = computed(() => {
    const item = route.options.routes.find(item => item.path == '/back')
    return item.children
})
</script>
<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;
}
:deep(.el-menu-item a) {
  color: inherit !important;      
  text-decoration: none !important;
  display: inline-block;
  width: 100%;                     
  height: 100%;
}
</style>