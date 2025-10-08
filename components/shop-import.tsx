'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

interface ShopImportProps {
  onImport: (shopNames: string[]) => void;
}

/**
 * 店铺批量导入组件
 */
export function ShopImport({ onImport }: ShopImportProps) {
  const [inputText, setInputText] = useState('');

  const handleImport = () => {
    if (!inputText.trim()) {
      alert('请输入店铺名称');
      return;
    }

    const names = inputText
      .split('、')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (names.length === 0) {
      alert('没有检测到有效的店铺名称');
      return;
    }

    onImport(names);
    setInputText('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="shop-input" className="text-sm font-medium text-gray-700">
          输入店铺名称（使用顿号"、"分隔）
        </label>
        <textarea
          id="shop-input"
          className="min-h-[120px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例如：韩记龙板面、劉記 淮南牛肉汤 火锅、四川小厨、河南姐妹砂锅土豆粉(爱民路店)..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <button
        onClick={handleImport}
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Upload className="h-4 w-4" />
        导入店铺列表
      </button>
    </div>
  );
}
