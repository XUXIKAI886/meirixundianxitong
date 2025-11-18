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
 * 检测是否在 Tauri 环境中运行
 */
export function isTauriEnvironment(): boolean {
  return typeof window !== 'undefined' &&
         typeof (window as TauriWindow).__TAURI__ !== 'undefined' &&
         typeof (window as TauriWindow).__TAURI__?.core !== 'undefined';
}

// Tauri window 类型声明
interface TauriWindow extends Window {
  __TAURI__?: {
    core: {
      invoke: (cmd: string, args?: unknown, options?: unknown) => Promise<unknown>;
    };
  };
}

/**
 * 复制文本到剪贴板 - 支持浏览器和 Tauri 双环境
 * @param text 要复制的文本
 * @returns 是否复制成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  const isTauri = isTauriEnvironment();

  // 浏览器环境 - 使用 Clipboard API
  if (!isTauri) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      console.error('浏览器剪贴板复制失败');
      return false;
    }
  }

  // Tauri 环境 - 使用 Tauri Clipboard API
  try {
    const tauriWindow = window as TauriWindow;
    await tauriWindow.__TAURI__!.core.invoke('plugin:clipboard-manager|write_text', {
      text: text
    });
    return true;
  } catch (error) {
    console.error('Tauri 剪贴板复制失败:', error);

    // 回退到浏览器 API
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
}
