# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

每日巡店系统 - 外卖运营任务管理Web应用，帮助运营人员追踪每日巡店任务进度。

**在线演示**: https://xuxikai886.github.io/meirixundianxitong/

## 技术栈

- **框架**: Next.js 15 (App Router, SSG静态导出)
- **语言**: TypeScript 5.7
- **样式**: Tailwind CSS 3.4
- **图标**: Lucide React

## 开发命令

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器 (localhost:3000)
npm run build        # 生产构建 (输出到 ./out)
npm run lint         # ESLint 代码检查
```

## 架构设计

### 数据层

- **存储**: 浏览器 localStorage，key 为 `daily-inspection-records`
- **隔离**: 按日期 (YYYY-MM-DD) 完全隔离，每天数据独立
- **核心接口**: `lib/storage.ts` 封装所有数据操作

### 数据模型 (lib/types.ts)

```typescript
interface Shop {
  id: string              // 时间戳+随机数
  name: string
  completed: boolean
  createdAt: string       // ISO 8601
  completedAt?: string
}

interface InspectionRecord {
  date: string            // YYYY-MM-DD
  shops: Shop[]
  totalCount: number
  completedCount: number
}
```

### 状态管理

单向数据流: 用户操作 → storage.ts 更新 localStorage → getTodayRecord() 读取 → setRecord() 更新 React 状态 → UI 重渲染

主页面 `app/page.tsx` 作为状态管理中枢，子组件通过 props 接收数据和回调。

### 组件职责

| 组件 | 职责 |
|------|------|
| `shop-import.tsx` | 店铺批量导入（顿号 `、` 分隔） |
| `shop-list.tsx` | 店铺列表展示、复制店名、切换完成状态 |
| `progress-stats.tsx` | 统计卡片和进度条 |
| `script-sidebar.tsx` | 20条预设话术模板，可折叠侧边栏 |

## 部署配置

项目使用 GitHub Actions 自动部署到 GitHub Pages。

**关键配置** (`next.config.ts`):
- `output: 'export'` - SSG 静态生成
- `basePath: '/meirixundianxitong'` - GitHub Pages 路径前缀
- `images.unoptimized: true` - 禁用 Image 优化

## 重要约定

1. **分隔符**: 店铺名使用中文顿号 `、` 分隔（非英文逗号）
2. **ID生成**: `Date.now() + 随机字符串`
3. **类名合并**: 使用 `lib/utils.ts` 中的 `cn()` 函数
4. **完成率计算**: `Math.round((completedCount / totalCount) * 100)`，有除零保护

## 色彩规范

- **蓝色**: 主操作（导入、统计）
- **绿色**: 完成状态
- **紫色**: 话术功能
- **橙色**: 危险操作（重置）
