# 每日巡店系统

一个简洁高效的每日巡店任务管理系统，帮助您轻松管理和追踪店铺巡检任务。

## 🌐 在线演示

**访问地址**：[https://xuxikai886.github.io/meirixundianxitong/](https://xuxikai886.github.io/meirixundianxitong/)

## ✨ 功能特点

- 📋 **批量导入店铺** - 支持使用顿号分隔的店铺名称批量导入
- ✅ **任务标记** - 一键标记店铺巡检完成状态
- 📊 **实时统计** - 动态展示巡店进度和完成率
- 📝 **话术侧边栏** - 内置20条每日群发话术模板，点击即可复制
- 📋 **快速复制** - 点击店铺名称即可复制，方便发送消息
- 🖥️ **Tauri 支持** - 完美兼容桌面应用环境，剪贴板功能无缝工作
- 🗓️ **日期自动更新** - 每天打开自动显示当前日期，数据按日期隔离
- 💾 **本地存储** - 数据保存在浏览器本地，无需服务器
- 📱 **响应式设计** - 完美适配各种屏幕尺寸

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **部署**: GitHub Pages (GitHub Actions)

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

在浏览器中访问：
- **本地开发**：[http://localhost:3000/meirixundianxitong/](http://localhost:3000/meirixundianxitong/)
- **或直接访问**：[http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
```

## 📖 使用说明

### 基础功能

1. **导入店铺列表**
   - 在文本框中粘贴店铺名称（使用"、"分隔）
   - 点击"导入店铺列表"按钮
   - 系统自动保存当天的店铺清单

2. **标记巡店状态**
   - 完成巡店后，点击对应店铺的状态按钮
   - 状态会立即更新并保存
   - 已完成的店铺会显示绿色背景和删除线

3. **查看统计数据**
   - 实时查看总店铺数、已完成数和完成率
   - 进度条直观展示完成情况
   - 数据自动计算，无需手动操作

### 新增功能

4. **快速复制店铺名称** ✨
   - 点击任意店铺名称即可复制
   - 复制成功后显示"已复制！"提示
   - 方便快速粘贴到微信等聊天工具

5. **话术侧边栏** ✨
   - 页面右侧展示20条每日群发话术模板
   - 涵盖关键词优化、商品权重、价格策略等场景
   - 点击任意话术卡片即可复制完整内容
   - 可折叠/展开，不影响主工作区
   - 底部包含使用建议（轮换使用、发送时间等）

6. **数据管理**
   - 点击"重置数据"清空当天所有店铺记录
   - 点击"刷新"按钮重新加载数据
   - 每天的数据独立存储，互不影响

## 🌐 GitHub Pages 部署

项目已配置 GitHub Actions 自动部署流程：

1. 将代码推送到 GitHub 仓库的 `main` 分支
2. GitHub Actions 自动触发构建和部署
3. 在仓库设置中启用 GitHub Pages（Source: GitHub Actions）
4. 访问 `https://<username>.github.io/<repository-name>`

## 📁 项目结构

```
├── app/                               # Next.js 应用目录
│   ├── page.tsx                      # 主页面（核心业务逻辑）
│   ├── layout.tsx                    # 根布局组件（含剪贴板权限策略）
│   ├── test-clipboard/               # 剪贴板测试页面
│   └── globals.css                   # 全局样式
├── components/                        # React 组件
│   ├── shop-import.tsx               # 店铺导入组件
│   ├── shop-list.tsx                 # 店铺列表组件（支持点击复制）
│   ├── progress-stats.tsx            # 统计展示组件
│   └── script-sidebar.tsx            # 话术侧边栏组件 ✨
├── lib/                              # 工具库
│   ├── types.ts                     # TypeScript 类型定义
│   ├── utils.ts                     # 工具函数（含 Tauri 剪贴板支持）
│   └── storage.ts                   # 本地存储逻辑（localStorage）
├── .github/workflows/                # GitHub Actions 配置
│   └── deploy.yml                   # 自动部署工作流
├── CLAUDE.md                         # AI 助手上下文文档
├── TAURI_DOWNLOAD_INTEGRATION_GUIDE.md  # Tauri 下载集成完整指南
├── TAURI_DOWNLOAD_QUICK_START.md    # Tauri 下载快速入门
├── 每日群发话术.md                    # 话术模板文档（20条）
├── next.config.ts                    # Next.js 配置（含 GitHub Pages 路径）
├── tailwind.config.ts                # Tailwind CSS 配置
└── package.json                      # 项目依赖
```

## 💡 数据存储

所有数据存储在浏览器的 localStorage 中，包括：
- 每日店铺列表
- 巡检完成状态
- 历史记录

### 存储机制
- **按日期隔离**：每天的数据独立存储，互不影响
- **自动保存**：所有操作立即保存到本地
- **持久化**：关闭浏览器后数据不会丢失
- **隐私安全**：数据仅存储在本地，不上传到服务器

## 💼 使用场景

- **外卖运营人员**：每天巡检商家店铺，追踪完成进度
- **连锁店管理**：管理多家分店的日常检查任务
- **区域督导**：记录每日巡店清单和完成情况
- **客户维护**：配合话术模板进行日常沟通

## 🎯 核心优势

1. **零成本部署**：使用 GitHub Pages 免费托管
2. **无需后端**：纯前端实现，部署简单
3. **响应迅速**：本地存储，无需网络请求
4. **功能完整**：从导入到统计，一站式解决
5. **使用便捷**：点击复制，一键群发
6. **跨平台兼容**：支持浏览器和 Tauri 桌面应用环境

## 🖥️ Tauri 桌面应用集成

本项目已完美适配 Tauri 桌面应用环境：

### 剪贴板支持
- ✅ 自动检测 Tauri 环境
- ✅ 多层回退方案确保复制功能始终可用
- ✅ 优先使用 Tauri 原生 clipboard API
- ✅ 回退到浏览器 Clipboard API
- ✅ 最终回退到 execCommand 方案

### 测试页面
访问 `/test-clipboard` 页面可测试剪贴板功能：
- 显示 Tauri API 可用性详情
- 提供多种复制方法测试
- 实时显示环境信息和调试日志

### 集成文档
项目包含完整的 Tauri 集成指南：
- `TAURI_DOWNLOAD_INTEGRATION_GUIDE.md` - 详细集成指南
- `TAURI_DOWNLOAD_QUICK_START.md` - 快速入门文档

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

如有问题或建议，请在 [GitHub Issues](https://github.com/XUXIKAI886/meirixundianxitong/issues) 中反馈。
