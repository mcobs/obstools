# 黑曜石工具箱

> 为我的世界玩家提供的实用工具集 | 黑曜石论坛官方工具站

## 🎮 项目简介

黑曜石工具箱是由 [黑曜石论坛](https://mcobs.cn) 提供的我的世界实用工具网站，为玩家提供各种便捷的游戏辅助工具。

## ✨ 主要功能

### 🗺️ 史莱姆区块查找器
- ✅ 支持 Java 版和基岩版
- ✅ 精确的算法实现（基于官方源码）
- ✅ 交互式地图（拖拽、缩放）
- ✅ 从存档加载（支持上传 level.dat 文件）
- ✅ 自动识别种子和出生点坐标

### 🔧 计划中的功能
- 📍 坐标计算器
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
- **Prismarine NBT** - NBT 格式解析
- **Pako** - Gzip 压缩/解压（浏览器兼容）
- **Buffer** - Node.js Buffer API 的浏览器 polyfill

## 📖 使用说明

### 史莱姆区块查找器

1. **输入种子**：输入你的世界种子（数字或字符串）
2. **选择版本**：选择 Java 版或基岩版
3. **设置坐标**：输入你想查找的中心坐标（可选）
4. **查看地图**：绿色区域即为史莱姆区块
5. **从存档加载**：直接上传 `level.dat` 文件自动获取种子

**注意**：
- Java 版和基岩版的史莱姆区块位置不同（即使种子相同）
- level.dat 位置：`.minecraft/saves/[世界名称]/level.dat`
- 史莱姆在 Y≤39 的史莱姆区块中生成（Java版）

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

## 📝 开发说明

### 项目结构
```
src/
├── components/         # React 组件
│   ├── Layout.tsx
│   ├── SlimeMap.tsx
│   ├── SlimeMap.module.css
│   ├── Toast.tsx          # 通知组件
│   └── ToastContainer.tsx # 通知管理器
├── pages/             # 页面组件
│   ├── Home.tsx
│   └── SlimeFinder.tsx
├── hooks/             # 自定义 Hooks
│   └── useSlimeChunks.ts
├── utils/             # 工具函数
│   ├── slimeChunk.ts      # 史莱姆区块算法
│   └── nbtParser.ts       # NBT 解析
├── App.tsx            # 应用根组件
├── main.tsx           # 入口文件
└── index.css          # 全局样式
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

本项目遵循 MIT 许可证

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**由黑曜石论坛提供支持** | [mcobs.cn](https://mcobs.cn)
