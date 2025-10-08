'use client';

import { useState, useEffect } from 'react';
import { ShopImport } from '@/components/shop-import';
import { ShopList } from '@/components/shop-list';
import { ProgressStats } from '@/components/progress-stats';
import { ScriptSidebar } from '@/components/script-sidebar';
import { InspectionRecord } from '@/lib/types';
import {
  getTodayRecord,
  createOrUpdateTodayRecord,
  toggleShopCompletion,
  resetTodayData,
} from '@/lib/storage';
import { formatDate, getTodayDate } from '@/lib/utils';
import { Store, RefreshCw, RotateCcw } from 'lucide-react';

/**
 * 每日巡店系统主页面
 */
export default function HomePage() {
  const [record, setRecord] = useState<InspectionRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 加载今天的巡店记录
  useEffect(() => {
    const loadTodayRecord = () => {
      const todayRecord = getTodayRecord();
      setRecord(todayRecord);
      setIsLoading(false);
    };

    loadTodayRecord();
  }, []);

  // 处理店铺导入
  const handleImport = (shopNames: string[]) => {
    const newRecord = createOrUpdateTodayRecord(shopNames);
    setRecord(newRecord);
  };

  // 处理巡店状态切换
  const handleToggleShop = (shopId: string) => {
    toggleShopCompletion(shopId);
    const updatedRecord = getTodayRecord();
    setRecord(updatedRecord);
  };

  // 刷新数据
  const handleRefresh = () => {
    const updatedRecord = getTodayRecord();
    setRecord(updatedRecord);
  };

  // 重置今天的数据
  const handleReset = () => {
    if (!record || record.shops.length === 0) {
      alert('暂无数据可重置');
      return;
    }

    const confirmed = confirm(
      '确定要清空今天的所有店铺数据吗？\n此操作将删除所有店铺和巡店记录，无法恢复！'
    );

    if (confirmed) {
      resetTodayData();
      setRecord(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <>
      {/* 话术侧边栏 */}
      <ScriptSidebar />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl pr-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Store className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  每日巡店系统
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {formatDate(getTodayDate())}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                重置数据
              </button>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                刷新
              </button>
            </div>
          </div>
        </div>

        {/* 导入区域 */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            批量导入店铺
          </h2>
          <ShopImport onImport={handleImport} />
        </div>

        {/* 统计数据 */}
        {record && (
          <div className="mb-8">
            <ProgressStats record={record} />
          </div>
        )}

        {/* 店铺列表 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            店铺巡检列表
          </h2>
          <ShopList
            shops={record?.shops || []}
            onToggle={handleToggleShop}
          />
        </div>
        </div>
      </div>
    </>
  );
}
