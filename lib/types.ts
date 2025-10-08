/**
 * 店铺接口定义
 */
export interface Shop {
  id: string;
  name: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

/**
 * 巡店记录接口定义
 */
export interface InspectionRecord {
  date: string;
  shops: Shop[];
  totalCount: number;
  completedCount: number;
}
