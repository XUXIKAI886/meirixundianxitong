'use client';

import { InspectionRecord } from '@/lib/types';
import { BarChart3, CheckCircle, ListChecks } from 'lucide-react';

interface ProgressStatsProps {
  record: InspectionRecord | null;
}

/**
 * 任务统计和进度展示组件
 */
export function ProgressStats({ record }: ProgressStatsProps) {
  if (!record) {
    return null;
  }

  const progressPercent = record.totalCount > 0
    ? Math.round((record.completedCount / record.totalCount) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ListChecks className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">总店铺数</p>
            <p className="text-2xl font-bold text-gray-900">{record.totalCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">已完成</p>
            <p className="text-2xl font-bold text-gray-900">{record.completedCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <BarChart3 className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">完成率</p>
            <p className="text-2xl font-bold text-gray-900">{progressPercent}%</p>
          </div>
        </div>
      </div>

      <div className="col-span-1 md:col-span-3">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">巡店进度</span>
            <span className="text-sm text-gray-600">
              {record.completedCount} / {record.totalCount}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
