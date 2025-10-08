import { Shop, InspectionRecord } from './types';
import { getTodayDate, generateId } from './utils';

const STORAGE_KEY = 'daily-inspection-records';

/**
 * 从 localStorage 获取所有巡店记录
 */
export function getInspectionRecords(): InspectionRecord[] {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * 获取今天的巡店记录
 */
export function getTodayRecord(): InspectionRecord | null {
  const records = getInspectionRecords();
  const today = getTodayDate();
  return records.find(r => r.date === today) || null;
}

/**
 * 保存巡店记录到 localStorage
 */
export function saveInspectionRecords(records: InspectionRecord[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

/**
 * 解析店铺名称字符串
 */
export function parseShopNames(input: string): string[] {
  return input
    .split('、')
    .map(name => name.trim())
    .filter(name => name.length > 0);
}

/**
 * 批量创建店铺
 */
export function createShopsFromNames(names: string[]): Shop[] {
  const now = new Date().toISOString();
  return names.map(name => ({
    id: generateId(),
    name,
    completed: false,
    createdAt: now,
  }));
}

/**
 * 创建或更新今天的巡店记录
 */
export function createOrUpdateTodayRecord(shopNames: string[]): InspectionRecord {
  const records = getInspectionRecords();
  const today = getTodayDate();
  const shops = createShopsFromNames(shopNames);

  const existingIndex = records.findIndex(r => r.date === today);

  const newRecord: InspectionRecord = {
    date: today,
    shops,
    totalCount: shops.length,
    completedCount: 0,
  };

  if (existingIndex >= 0) {
    records[existingIndex] = newRecord;
  } else {
    records.push(newRecord);
  }

  saveInspectionRecords(records);
  return newRecord;
}

/**
 * 标记店铺完成状态
 */
export function toggleShopCompletion(shopId: string): void {
  const records = getInspectionRecords();
  const today = getTodayDate();
  const todayRecord = records.find(r => r.date === today);

  if (!todayRecord) return;

  const shop = todayRecord.shops.find(s => s.id === shopId);
  if (!shop) return;

  shop.completed = !shop.completed;
  shop.completedAt = shop.completed ? new Date().toISOString() : undefined;

  todayRecord.completedCount = todayRecord.shops.filter(s => s.completed).length;

  saveInspectionRecords(records);
}

/**
 * 删除指定日期的记录
 */
export function deleteRecord(date: string): void {
  const records = getInspectionRecords();
  const filtered = records.filter(r => r.date !== date);
  saveInspectionRecords(filtered);
}

/**
 * 清空今天的所有数据（包括店铺列表）
 */
export function resetTodayData(): void {
  const records = getInspectionRecords();
  const today = getTodayDate();
  const filtered = records.filter(r => r.date !== today);
  saveInspectionRecords(filtered);
}

/**
 * 清空所有历史数据
 */
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
