<template>
  <div class="common-layout">
    <el-container style="height: 100vh; width: 100vw;">
      <SideBar />
      <el-container direction="vertical">
        <el-header style="padding: 0; height: 80px;">
          <NavBar />
        </el-header>
        <el-main class="view-container">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue';
import NavBar from '@/components/NavBar.vue';
</script>
<style scoped>
.common-layout,
.el-container {
  height: 100vh;
  /* vue的文件根据视口宽度比普通的按照父级元素的宽高来写样式更加靠谱 */
  width: 100vw;
}

.el-header {
  --el-header-padding: 0;
  /* 使用 CSS 变量清除 */
  padding: 0;
  /* 双重保险 */
  height: auto;
  /* 确保高度根据内容自适应 */
}

/* 强制消除右侧容器的所有默认内边距 */
:deep(.el-header) {
  padding: 0 !important;
  --el-header-padding: 0 !important;
  height: auto !important;
  /* 确保高度由 NavBar 决定 */
}

/* 确保侧边栏没有右边距 */
:deep(.el-aside) {
  margin-right: 0 !important;
}

/* 确保菜单组件撑满侧边栏 */
.el-menu {
  width: 100% !important;
  border-right: none !important;
  /* 去掉那条碍眼的侧边线 */
}

/* 检查是否有关不掉的 margin */
.sidebar-container {
  margin: 0;
  padding: 0;
}

.view-container {
  max-height: calc(100%-80px);
  margin-left: 20px;
  margin-top: 20px;
  max-width: calc(100%-240px);
  background-color: white;
  margin-right: 10px;
}
</style>