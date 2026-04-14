# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# 4.14 知识点汇总
1. Vue Router 配置基础
配置项名称：createRouter 配置对象中的属性名必须是 routes（复数），不能写成 route。

导出规范：直接 export default router（实例本身），不要用对象包裹 { router }，否则 main.js 无法识别。

History 模式：createWebHistory() 路径无 # 但上线需后端 Nginx 配置；createWebHashHistory() 路径带 # 但无需配置后端。

2. 嵌套路由 (Nested Routes)
路径写法：子路由（children）的 path 不要加斜杠 /。加了 / 会被视为根路径，导致拼接失效。

渲染出口：父组件必须包含 <router-view />，否则子组件内容无处显示。

3. 路由元信息 (Meta)
作用：路由的自定义“名片”，常用于存页面标题、图标、权限标识。

访问方式：

模板中：$route.meta.xxx

脚本中：const route = useRoute(); route.meta.xxx

动态菜单：可以直接循环 router.options.routes 中的子路由，通过 meta 动态渲染侧边栏标题和图标。

4. 路由跳转 (Link vs Menu)
<router-link>：会被渲染为 <a> 标签。它会拦截跳转，防止页面整体刷新。

el-menu 路由模式：在 el-menu 上加 router 属性后，el-menu-item 的 index 即为跳转路径。推荐此做法，可避免手动写 <a> 标签带来的样式冲突（如蓝色字、下划线）。

5. 样式穿透 (Deep Selector)
场景：当 <style scoped> 无法修改第三方库（Element Plus）内部生成的 HTML 样式时。

原理：scoped 会给标签加 data-v-xxx 属性限制作用域。

用法：使用 :deep(.selector)。它允许样式“穿透”防护墙，直接作用于子组件内部。

6. 静态资源动态加载
核心语法：new URL('@/assets/img.png', import.meta.url).href

目的：确保图片在经过 Vite 打包、添加哈希值后，依然能被 JS 代码动态准确定位。

7. 布局与高度问题
撑满全屏：设置 height: 100% 前提是父级（html, body, #app）必须有高度。

懒人方案：直接在最外层容器使用 height: 100vh（视口高度），不依赖父级即可强制撑满屏幕。