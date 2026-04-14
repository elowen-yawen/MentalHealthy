<template>
  <div class="common-layout">
    <el-container>
      <SideBar style="height: 100%;"/>
      <el-container>
        <el-header>
          <NavBar />
        </el-header>
        <el-main>
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
</style>