<template>
    <el-aside :width="isCollapse ? '64px' : '230px'"
        style="flex-shrink: 0; background-color: white; border-right: 1px solid #e6e6e6; overflow: hidden;">
        <el-menu default-active="2" class="el-menu-vertical-demo" style="height: 100%; border-right: none;">
            <div class="container">
                <img src="@/assets/机器人.png" alt="" style="height: 40px; width: 40px; flex-shrink: 0;">
                <div class="aside-text" v-show="!isCollapse">
                    <h3 class="title">心理健康AI助手</h3>
                    <span class="subtitle">管理后台</span>
                </div>
            </div>

            <el-menu-item v-for="p in menu" :key="p.path" :index="p.path">
                <el-icon>
                    <component :is="p.meta.icon"></component>
                </el-icon>
                <template #title>
                    <router-link :to="'/back/' + p.path" class="menu-link" v-show="!isCollapse">{{ p.meta.title }}</router-link>
                </template>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
import { adminStore } from '@/stores/admin';
const route = useRouter()
const isCollapse=computed(()=>adminStore().isCollapse)
const menu = computed(() => {
    const item = route.options.routes.find(item => item.path == '/back')
    return item.children
})
</script>
<style scoped>
.container {
    display: flex;
    align-items: center;
    padding: 20px 15px;
    /* 适当的内边距 */
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;
    overflow: hidden;
}

.aside-text {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title {
    font-size: 16px;
    /* 稍微调小一点，防止 260px 下换行 */
    font-weight: bold;
    color: #1f2937;
    margin: 0;
    white-space: nowrap;
    /* 强制不换行 */
}

.subtitle {
    font-size: 12px;
    color: #6b7280;
}

.menu-link {
    color: inherit;
    text-decoration: none;
    display: inline-block;
    width: 100%;
}

/* 修正菜单项的样式，确保文字不被挤压 */
:deep(.el-menu-item) {
    display: flex;
    align-items: center;
}
</style>