import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind CSS 类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 获取今天的日期字符串 (YYYY-MM-DD)
 */
export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * 格式化日期显示
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 复制文本到剪贴板 - 支持浏览器和 Tauri 环境
 * @param text 要复制的文本
 * @returns 是否复制成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Tauri 环境中 navigator.clipboard 也可用
    await navigator.clipboard.writeText(text);
    console.log('✅ 复制成功:', text.substring(0, 20) + '...');
    return true;
  } catch (error) {
    console.error('❌ 剪贴板复制失败:', error);
    return false;
  }
}
