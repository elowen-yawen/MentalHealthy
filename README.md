# MentalHealthy 心理健康管理平台

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-green" />
  <img src="https://img.shields.io/badge/Vite-5.0-blue" />
  <img src="https://img.shields.io/badge/Element--Plus-2.13-brightgreen" />
  <img src="https://img.shields.io/badge/ECharts-6.0-orange" />
</p>

> 🌟 一个温暖的心理健康管理平台，让每个人都能获得专业的心理陪伴与支持

---

## 📖 项目简介

MentalHealthy 是一款专注于心理健康的全栈式应用平台，集成了 **AI 智能对话**、**情绪追踪分析**、**心理健康知识库** 等核心功能，为用户提供随时随地的心理健康服务。

平台采用前后端分离架构，前端基于 Vue 3 + Vite 构建，后端 API 支持流式响应输出，打造流畅自然的 AI 对话体验。

---

## ✨ 核心功能

### 🤖 AI 智能助手
- **流式对话体验** — 基于 SSE (Server-Sent Events) 技术，实时获取 AI 回复，感受如同与真人交流般的流畅体验
- **情绪识别与分析** — 智能分析对话内容，识别用户情绪状态与风险等级
- **个性化建议** — 根据用户情绪提供定制化的心理疏导与改善建议

### 📊 情绪日记
- **多维情绪记录** — 支持情绪评分、主要情绪类型、生活指标（睡眠质量、压力水平）等全方位记录
- **情绪可视化** — 直观展示情绪变化趋势，帮助用户了解自己的情绪模式
- **触发因素分析** — 记录情绪触发因素，深入了解影响情绪的根源

### 📚 心理健康知识库
- **丰富文章内容** — 涵盖焦虑、抑郁、压力管理等各类心理健康主题
- **智能分类推荐** — 根据用户状态推荐相关阅读内容
- **专业内容管理** — 后台支持文章的完整管理流程（创建、编辑、发布、下线）

### 📈 数据驾驶舱
- **系统数据概览** — 用户总数、活跃用户、情绪日志、咨询对话等核心指标一目了然
- **趋势分析图表** — ECharts 强大的可视化能力，呈现情绪趋势、用户活跃度等多维数据
- **实时统计更新** — 数据实时更新，帮助管理者掌握平台动态

---

## 🛠️ 技术栈

| 技术 | 说明 | 版本 |
|------|------|------|
| **Vue 3** | 渐进式 JavaScript 框架 | ^3.5.32 |
| **Vite** | 新一代前端构建工具 | ^5.0.0 |
| **Vue Router** | Vue.js 官方路由管理 | ^4.6.4 |
| **Pinia** | 新一代状态管理方案 | ^3.0.4 |
| **Element Plus** | 基于 Vue 3 的组件库 | ^2.13.7 |
| **ECharts** | 百度开源可视化图表库 | ^6.0.0 |
| **Axios** | HTTP 请求库 | ^1.15.1 |
| **wangEditor** | 轻量级富文本编辑器 | ^5.1.23 |
| **SCSS** | CSS 预处理器 | ^1.99.0 |

---

## 🎨 项目亮点

### 1. 流式 AI 对话体验 🚀
```
采用 @microsoft/fetch-event-source 实现 SSE 流式请求
AI 回复逐字输出，打字机效果增强真实感
支持 Markdown 渲染，代码高亮，让回复更专业美观
```

### 2. 智能风险预警系统 🛡️
```
多维度风险评估模型
风险等级分级（正常 → 关注 → 预警 → 危机）
高风险用户及时提醒与建议
```

### 3. 精美的 UI/UX 设计 🎀
```
渐变色与柔和色调，营造温暖治愈感
卡片式布局，层次分明
平滑的动画过渡，提升用户体验
响应式设计，适配各种设备
```

### 4. 完善的管理后台 📋
```
数据驾驶舱 — ECharts 多图表展示系统全貌
情绪日志管理 — 查看、筛选、删除用户情绪记录
咨询会话管理 — 追溯用户与 AI 的完整对话历史
知识库管理 — 文章的 CRUD 完整流程
```

### 5. 情绪花园 🌸
```
侧边栏实时展示当前情绪状态
风险提示与小建议温馨提醒
治愈行动推荐，帮助用户改善情绪
```

---

## 📂 项目结构

```
MentalHealthy/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/              # API 接口封装
│   │   ├── admin.js
│   │   └── frontend.js
│   ├── assets/           # 静态资源
│   │   ├── 开心.png       # 情绪表情图标
│   │   ├── 平静.png
│   │   ├── 焦虑.png
│   │   └── ...
│   ├── components/       # 公共组件
│   │   ├── ArticleDialog.vue
│   │   ├── AuthLayout.vue
│   │   ├── BackendLayout.vue
│   │   ├── FrontendLayout.vue
│   │   ├── MarkdownRenderer.vue
│   │   ├── NavBar.vue
│   │   ├── RichTextEditor.vue
│   │   ├── SideBar.vue
│   │   └── TopForm.vue
│   ├── config/           # 配置文件
│   │   └── index.js
│   ├── router/            # 路由配置
│   │   └── index.js
│   ├── stores/            # Pinia 状态管理
│   │   └── admin.js
│   ├── utils/             # 工具函数
│   │   └── request.js
│   ├── views/             # 页面组件
│   │   ├── user/          # 用户端
│   │   │   ├── Home.vue
│   │   │   ├── UserEmotionDiary.vue
│   │   │   ├── UserConsulation.vue
│   │   │   └── UserKnowledge.vue
│   │   └── admin/         # 管理端
│   │       ├── DashBoard.vue
│   │       ├── Emotional.vue
│   │       ├── Consultations.vue
│   │       └── Knowledge.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── package.json
└── vite.config.js
```

---

## 🔧 运行项目

```bash
# 安装依赖
npm install

# 开发环境运行
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 💡 设计理念

> **「一次温暖的对话，化孤独为慰藉」**

我们相信，每个人都值得被倾听，每一份情绪都值得被重视。MentalHealthy 致力于打破心理健康的门槛，让专业的心理支持触手可及。

---

<p align="center">
  <strong>MentalHealthy</strong> — 您的贴心 AI 心理健康助手
</p>
