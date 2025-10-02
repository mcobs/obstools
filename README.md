# 黑曜石工具箱

> 为我的世界玩家提供的实用工具集 | 黑曜石论坛官方工具站

## 🎮 项目简介

黑曜石工具箱是由 [黑曜石论坛](https://mcobs.cn) 提供的我的世界实用工具网站，为玩家提供各种便捷的游戏辅助工具。

## ✨ 主要功能

### 🎮 生存实用工具

#### 🗺️ 史莱姆区块查找器
- ✅ 支持 Java 版和基岩版
- ✅ 精确的算法实现（基于官方源码）
- ✅ 交互式地图（拖拽、缩放、方向指示）
- ✅ 从存档加载（支持上传 level.dat 文件）
- ✅ 自动识别种子和出生点坐标

#### 📐 坐标计算器
- ✅ 主世界与下界坐标互相转换
- ✅ 支持 1:8 比例计算
- ✅ 双向转换功能
- ✅ 支持小数坐标

### 🖥️ 服务器实用工具

#### 💬 MOTD 生成器
- ✅ 服务器 MOTD 在线生成
- ✅ 支持 AMOTD 插件联动
- 🔗 外部链接：[motd.mcobs.cn](https://motd.mcobs.cn/)

### 🔧 计划中的功能
- 🌍 生物群系查找器
- 🧭 更多实用工具...

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 🛠️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **React Router** - 路由管理
- **Zustand** - 状态管理
- **Prismarine NBT** - NBT 格式解析
- **Pako** - Gzip 压缩/解压（浏览器兼容）
- **Buffer** - Node.js Buffer API 的浏览器 polyfill
- **Lucide React** - 图标库

## 🔗 相关链接

- **GitHub 仓库**：https://github.com/mcobs/obstools
- **黑曜石论坛**：https://mcobs.cn
- **论坛资源下载**：https://mcobs.cn/forum-24-1.html
- **意见反馈**：https://mcobs.cn/forum-26-1.html

## 📚 算法参考资料

本项目中的史莱姆区块算法基于以下开源项目和社区研究成果：

### Java 版算法
- 基于 Minecraft 官方源码的逆向工程
- 使用标准的 Java `Random` 类实现

### 基岩版算法
- **主要参考**：[SlimeChunkFinder by bWFuanVzYWth](https://github.com/bWFuanVzYWth/SlimeChunkFinder)
  - [chunk.rs](https://github.com/bWFuanVzYWth/SlimeChunkFinder/blob/master/src/chunk.rs) - 区块种子计算
  - [slime_chunk.rs](https://github.com/bWFuanVzYWth/SlimeChunkFinder/blob/master/src/slime_chunk.rs) - MT19937 实现
  - [finder.rs](https://github.com/bWFuanVzYWth/SlimeChunkFinder/blob/master/src/finder.rs) - 查找算法
- 基于社区反向工程的 MT19937 (Mersenne Twister) 实现
- 特性：基岩版史莱姆区块位置在所有世界中固定，不随种子变化

## 📝 软件架构

### 架构设计

本项目采用**前端单页应用（SPA）**架构，所有计算和处理均在客户端完成，无需后端服务器。

**架构特点**：
- 🎯 **纯前端应用** - 零后端依赖，可部署到任何静态托管服务
- 🔒 **隐私保护** - 用户数据不上传，所有计算本地完成
- ⚡ **高性能** - 无网络延迟，即时响应
- 📦 **轻量化** - 无需数据库，无服务器成本

### 技术架构层次

```
┌─────────────────────────────────────┐
│         用户界面层 (UI Layer)        │
│  React Components + Tailwind CSS    │
├─────────────────────────────────────┤
│        路由层 (Routing Layer)        │
│         React Router v6             │
├─────────────────────────────────────┤
│        状态管理层 (State Layer)       │
│      Zustand + React Hooks          │
├─────────────────────────────────────┤
│        业务逻辑层 (Logic Layer)       │
│   算法实现 + 数据处理 + NBT解析      │
├─────────────────────────────────────┤
│        工具层 (Utility Layer)        │
│  Pako (Gzip) + Buffer + Prismarine  │
└─────────────────────────────────────┘
```

### 项目目录结构

```
src/
├── components/              # UI 组件
│   ├── Layout.tsx          # 页面布局（导航栏+页脚）
│   ├── SlimeMap.tsx        # 史莱姆区块地图组件
│   ├── SlimeMap.module.css # 地图样式
│   ├── Toast.tsx           # 通知提示组件
│   └── ToastContainer.tsx  # 通知容器（状态管理）
│
├── pages/                   # 页面组件
│   ├── Home.tsx            # 首页（展示介绍）
│   ├── ToolsList.tsx       # 工具列表页（分类展示）
│   ├── SlimeFinder.tsx     # 史莱姆区块查找器
│   └── CoordinateCalculator.tsx  # 坐标计算器
│
├── hooks/                   # 自定义 Hooks
│   └── useSlimeChunks.ts   # 史莱姆区块计算逻辑
│
├── utils/                   # 工具函数
│   ├── slimeChunk.ts       # 史莱姆算法（Java/基岩版）
│   └── nbtParser.ts        # NBT 文件解析（level.dat）
│
├── App.tsx                 # 应用根组件（路由配置）
├── main.tsx                # 应用入口（DOM 挂载）
├── index.css               # 全局样式
└── vite-env.d.ts           # TypeScript 类型声明
```

### 关键算法

**Java 版算法**（依赖世界种子）：
```
chunkSeed = worldSeed + 
  (chunkX * chunkX) * 0x4C1906 + chunkX * 0x5AC0DB + 
  (chunkZ * chunkZ) * 0x4307A7 + chunkZ * 0x5F24F ^ 0x3AD8025F
```
- 使用 Java Random 类的 LCG 算法
- 生成概率为 10%（1/10）

**基岩版算法**（不依赖世界种子）：
```
chunkSeed = (chunkX * 0x1f1f1f1f) ^ chunkZ
```
- 所有世界的史莱姆区块位置固定
- 使用 MT19937 (Mersenne Twister) 随机数生成器
- 判断生成的随机数是否能被 10 整除
- 算法来源：社区反向工程
- 参考实现：
  - [SlimeChunkFinder/chunk.rs](https://raw.githubusercontent.com/bWFuanVzYWth/SlimeChunkFinder/refs/heads/master/src/chunk.rs) - 种子计算
  - [SlimeChunkFinder/slime_chunk.rs](https://raw.githubusercontent.com/bWFuanVzYWth/SlimeChunkFinder/refs/heads/master/src/slime_chunk.rs) - MT19937 实现
  - [SlimeChunkFinder/finder.rs](https://raw.githubusercontent.com/bWFuanVzYWth/SlimeChunkFinder/refs/heads/master/src/finder.rs) - 查找逻辑

## 📄 许可证

本项目遵循 GPL-3.0 许可证

Copyright (C) 2025 黑曜石论坛 (mcobs.cn)

本程序是自由软件：你可以根据自由软件基金会发布的 GNU 通用公共许可证（第3版或更高版本）的条款重新分发和/或修改它。

完整许可证文本请查看 [LICENSE](./LICENSE) 文件或访问 <https://www.gnu.org/licenses/gpl-3.0.html>

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**由黑曜石论坛提供支持** | [mcobs.cn](https://mcobs.cn)
