# 每日巡店系统

一个简洁高效的每日巡店任务管理系统，帮助您轻松管理和追踪店铺巡检任务。

## ✨ 功能特点

- 📋 **批量导入店铺** - 支持使用顿号分隔的店铺名称批量导入
- ✅ **任务标记** - 一键标记店铺巡检完成状态
- 📊 **实时统计** - 动态展示巡店进度和完成率
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

在浏览器中访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
```

## 📖 使用说明

1. **导入店铺列表**
   - 在文本框中粘贴店铺名称（使用"、"分隔）
   - 点击"导入店铺列表"按钮

2. **标记巡店状态**
   - 完成巡店后，点击对应店铺的状态按钮
   - 状态会立即更新并保存

3. **查看统计数据**
   - 实时查看总店铺数、已完成数和完成率
   - 进度条直观展示完成情况

## 🌐 GitHub Pages 部署

项目已配置 GitHub Actions 自动部署流程：

1. 将代码推送到 GitHub 仓库的 `main` 分支
2. GitHub Actions 自动触发构建和部署
3. 在仓库设置中启用 GitHub Pages（Source: GitHub Actions）
4. 访问 `https://<username>.github.io/<repository-name>`

## 📁 项目结构

```
├── app/                    # Next.js 应用目录
│   ├── page.tsx           # 主页面
│   ├── layout.tsx         # 布局组件
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── shop-import.tsx    # 店铺导入组件
│   ├── shop-list.tsx      # 店铺列表组件
│   └── progress-stats.tsx # 统计展示组件
├── lib/                   # 工具库
│   ├── types.ts          # TypeScript 类型定义
│   ├── utils.ts          # 工具函数
│   └── storage.ts        # 本地存储逻辑
└── .github/workflows/     # GitHub Actions 配置
    └── deploy.yml        # 部署工作流

```

## 💡 数据存储

所有数据存储在浏览器的 localStorage 中，包括：
- 每日店铺列表
- 巡检完成状态
- 历史记录

数据按日期组织，每天都有独立的记录。

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
