'use client';

import { useState, useEffect } from 'react';
import { copyToClipboard } from '@/lib/utils';

/**
 * 剪贴板测试页面
 */
export default function TestClipboardPage() {
  const [status, setStatus] = useState<string>('');
  const [testText] = useState('测试文本：每日巡店系统');
  const [envInfo, setEnvInfo] = useState<string>('加载中...');

  // 客户端加载环境信息
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const info = `navigator.clipboard: ${typeof navigator.clipboard}
window.__TAURI__: ${typeof (window as any).__TAURI__}
userAgent: ${navigator.userAgent}`;
      setEnvInfo(info);
    }
  }, []);

  const handleTestCopy = async () => {
    setStatus('测试中...');

    // 检测环境
    const isTauri = typeof (window as any).__TAURI__ !== 'undefined';
    console.log('🔍 环境检测:', isTauri ? 'Tauri 桌面应用' : '浏览器');
    console.log('🔍 navigator.clipboard 可用:', typeof navigator.clipboard !== 'undefined');

    // 测试复制
    const success = await copyToClipboard(testText);

    if (success) {
      setStatus('✅ 复制成功！请粘贴测试');
    } else {
      setStatus('❌ 复制失败，查看控制台');
    }
  };

  const handleDirectTest = async () => {
    setStatus('直接测试中...');
    try {
      await navigator.clipboard.writeText('直接复制测试');
      setStatus('✅ 直接 API 复制成功');
      console.log('✅ navigator.clipboard.writeText 成功');
    } catch (error) {
      setStatus('❌ 直接 API 复制失败');
      console.error('❌ navigator.clipboard.writeText 失败:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">剪贴板功能测试</h1>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-gray-700">测试文本：</p>
            <p className="font-mono mt-2">{testText}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleTestCopy}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              测试 copyToClipboard 函数
            </button>

            <button
              onClick={handleDirectTest}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              测试直接 API
            </button>
          </div>

          {status && (
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="font-medium">{status}</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-yellow-50 rounded-md border border-yellow-200">
            <p className="text-sm text-gray-700 font-medium mb-2">调试说明：</p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>打开浏览器控制台 (F12) 查看详细日志</li>
              <li>点击按钮后，尝试粘贴 (Ctrl+V) 验证</li>
              <li>检查是否有权限提示</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">环境信息：</p>
            <pre className="text-xs bg-white p-3 rounded border overflow-auto">
{envInfo}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
