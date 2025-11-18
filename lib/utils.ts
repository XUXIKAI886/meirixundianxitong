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

// Tauri window 类型定义
interface TauriWindow extends Window {
  __TAURI__?: {
    clipboard?: {
      writeText: (text: string) => Promise<void>;
    };
    core?: {
      invoke: (cmd: string, args?: unknown) => Promise<unknown>;
    };
  };
}

/**
 * 复制文本到剪贴板 - 支持浏览器和 Tauri 环境
 * @param text 要复制的文本
 * @returns 是否复制成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  const win = window as TauriWindow;

  // 方法1: 尝试使用 Tauri clipboard API
  if (typeof win.__TAURI__ !== 'undefined') {
    try {
      // Tauri 2.x 使用 clipboard.writeText
      if (win.__TAURI__.clipboard?.writeText) {
        await win.__TAURI__.clipboard.writeText(text);
        console.log('✅ [Tauri clipboard] 复制成功:', text.substring(0, 20) + '...');
        return true;
      }

      // 备用方案: 使用 invoke 调用
      if (win.__TAURI__.core?.invoke) {
        await win.__TAURI__.core.invoke('plugin:clipboard-manager|write_text', {
          data: { plaintext: text }
        });
        console.log('✅ [Tauri invoke] 复制成功:', text.substring(0, 20) + '...');
        return true;
      }
    } catch (error) {
      console.warn('⚠️ Tauri 剪贴板失败，尝试浏览器 API:', error);
    }
  }

  // 方法2: 回退到浏览器 clipboard API
  try {
    await navigator.clipboard.writeText(text);
    console.log('✅ [Browser clipboard] 复制成功:', text.substring(0, 20) + '...');
    return true;
  } catch (error) {
    console.error('❌ 剪贴板复制失败:', error);

    // 方法3: 最后的回退方案 - 使用 textarea
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (success) {
        console.log('✅ [execCommand] 复制成功:', text.substring(0, 20) + '...');
        return true;
      }
    } catch (fallbackError) {
      console.error('❌ execCommand 也失败:', fallbackError);
    }

    return false;
  }
}
