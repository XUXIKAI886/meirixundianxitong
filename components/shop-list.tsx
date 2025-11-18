'use client';

import { useState } from 'react';
import { Shop } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { CheckCircle2, Circle, Copy } from 'lucide-react';

interface ShopListProps {
  shops: Shop[];
  onToggle: (shopId: string) => void;
}

/**
 * 店铺列表展示组件
 */
export function ShopList({ shops, onToggle }: ShopListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 复制店铺名称
  const handleCopyShopName = async (shop: Shop) => {
    const success = await copyToClipboard(shop.name);
    if (success) {
      setCopiedId(shop.id);
      // 1.5秒后清除复制提示
      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } else {
      alert('复制失败，请手动复制');
    }
  };

  if (shops.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        暂无店铺数据，请先导入店铺列表
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md">
        <div className="col-span-1">序号</div>
        <div className="col-span-8">店铺名称</div>
        <div className="col-span-3 text-center">巡店状态</div>
      </div>

      {shops.map((shop, index) => (
        <div
          key={shop.id}
          className={`grid grid-cols-12 gap-2 px-4 py-3 rounded-md border transition-colors ${
            shop.completed
              ? 'bg-green-50 border-green-200'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="col-span-1 text-sm text-gray-600">
            {index + 1}
          </div>
          <div className="col-span-8 flex items-center gap-2 group">
            <button
              onClick={() => handleCopyShopName(shop)}
              className={`text-sm text-left flex-1 hover:text-blue-600 transition-colors cursor-pointer ${
                shop.completed ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}
              title="点击复制店铺名称"
            >
              {shop.name}
            </button>
            <Copy 
              className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" 
            />
            {copiedId === shop.id && (
              <span className="text-xs text-green-600 font-medium whitespace-nowrap">
                已复制！
              </span>
            )}
          </div>
          <div className="col-span-3 flex justify-center">
            <button
              onClick={() => onToggle(shop.id)}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: shop.completed ? '#10b981' : '#e5e7eb',
                color: shop.completed ? 'white' : '#374151',
              }}
            >
              {shop.completed ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  已完成
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4" />
                  未完成
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
