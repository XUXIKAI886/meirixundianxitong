'use client';

import { useState } from 'react';
import { Copy, Check, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface Script {
  id: number;
  title: string;
  content: string;
}

const scripts: Script[] = [
  {
    id: 1,
    title: '关键词优化调整',
    content: '老板，今天我们重点优化了您店铺的关键词匹配。主要是根据最近平台的搜索趋势，调整了一些高流量关键词的出价和权重设置，让您店铺在用户搜索相关品类时能获得更好的排名位置。这种调整需要平台算法重新学习，一般几天后就能看到搜索曝光量的变化。我们会持续监控效果，根据数据反馈及时微调策略。'
  },
  {
    id: 2,
    title: '商品权重排序优化',
    content: '老板，今天我们分析了您店铺的商品数据，把转化率高、复购好的商品权重往上提了，让这些爆款能获得更多曝光机会。同时对一些点击率低的商品重新调整了展示位置和图片素材。商品排序对客户的下单决策影响很大，我们会根据实时数据持续优化，确保每个商品都在最合适的位置。'
  },
  {
    id: 3,
    title: '运营时段策略调整',
    content: '老板，今天我们根据您店铺的订单高峰期数据，重新优化了运营投放时段。主要是把预算集中在午餐和晚餐的黄金时段，减少了低峰期的无效投放，让每一块运营费用都能发挥最大效果。这种精细化的时段管理能有效提升转化率，降低获客成本。'
  },
  {
    id: 4,
    title: '竞品分析与价格调整',
    content: '老板，今天我们重点分析了周边竞争对手的最新动态。发现有几家在调整活动力度和价格策略，我们已经根据这些变化优化了您店铺的价格竞争力。不是单纯降价，而是在保证利润的前提下，通过套餐组合和满减设置来增强性价比优势。外卖市场竞争激烈，我们会持续盯着对手的动作及时调整策略。'
  },
  {
    id: 5,
    title: '店铺评分与口碑维护',
    content: '老板，今天我们检查了您店铺的评分和最新评价情况。对一些差评我们分析了原因，对好评我们总结了优势点。评分和口碑直接影响平台给您的推荐权重，我们会重点优化那些客户关注的细节，提升整体满意度。建议您配合做好出餐质量和配送速度，这是维持高评分的关键。'
  },
  {
    id: 6,
    title: '流量来源结构分析',
    content: '老板，今天我们分析了您店铺的流量来源数据，看看订单主要是从搜索、推荐还是活动入口来的。根据这些数据，我们调整了不同渠道的投放策略，把资源集中在转化效果最好的流量入口。流量质量比流量数量更重要，我们要的是精准客户而不是无效曝光。'
  },
  {
    id: 7,
    title: '客单价与利润优化',
    content: '老板，今天我们重点分析了您店铺的客单价结构。通过优化商品组合推荐、调整满减门槛、增加加购引导等方式，提升每单的平均消费金额。外卖不能只看单量，利润才是核心。我们会在保证订单量的基础上，逐步提升您的到手收入，让经营更健康。'
  },
  {
    id: 8,
    title: '新老客户运营策略',
    content: '老板，今天我们分析了您店铺的新老客户占比数据。针对新客户，我们优化了首单优惠和商品展示；针对老客户，我们设置了专属折扣和会员权益。新客获取和老客维护要同时做好，这样店铺才能持续稳定增长。复购率高的店铺，平台会给更多的流量扶持。'
  },
  {
    id: 9,
    title: '平台算法适配调整',
    content: '老板，今天我们根据平台最新的推荐算法，调整了您店铺的各项基础设置。包括商品标签、店铺分类、配送范围这些细节，让您的店铺更符合平台的推荐逻辑。平台的算法一直在更新，我们要及时跟上这些变化，才能保持竞争优势。这些调整会让平台更准确地把您推荐给合适的客户。'
  },
  {
    id: 10,
    title: '数据监控与趋势预判',
    content: '老板，今天我们对您店铺的核心数据进行了全面监控，包括曝光量、点击率、转化率、客单价这些关键指标。从数据趋势来看，店铺整体在稳步上升，有波动的地方我们已经分析了原因。数据会说话，我们每天都在盯着这些数字，及时发现问题及时调整。外卖运营是个精细活，需要持续的数据跟踪和策略优化。'
  },
  {
    id: 11,
    title: '商品图片素材优化',
    content: '老板，今天我们重点优化了您店铺的商品图片素材。主要是根据点击率数据，把一些转化效果不好的图片重新设计了，增强视觉吸引力和食欲感。外卖是个视觉生意，图片好不好直接影响客户的点击和下单意愿。我们会根据实际点击数据持续测试不同风格的图片，找到最适合您店铺的视觉呈现方式。'
  },
  {
    id: 12,
    title: '差评应对与优化',
    content: '老板，今天我们分析了您店铺的最新差评情况。针对客户反馈的问题，我们制定了改进方案，包括优化商品描述的准确性、调整菜品分量标注、完善备注提醒等。差评虽然不好看，但也是发现问题的机会。我们会把这些问题点逐一解决，减少后续的差评率，提升整体店铺评分。'
  },
  {
    id: 13,
    title: '配送范围与时效优化',
    content: '老板，今天我们分析了您店铺的配送数据。根据订单分布和配送时长，我们调整了配送范围设置，把一些超时率高的远距离区域做了优化处理。配送时效直接影响客户体验和评分，我们要在覆盖范围和配送质量之间找到最佳平衡点。这样既能保证客户满意度，又能降低超时风险。'
  },
  {
    id: 14,
    title: '会员体系与复购策略',
    content: '老板，今天我们针对您店铺的老客户数据，优化了会员权益和复购激励设置。包括调整会员折扣力度、设置专属优惠券、优化积分兑换规则等。外卖的利润核心在于复购，一个稳定的老客户群体比不断获取新客更有价值。我们会持续优化会员体系，让老客户更有归属感和复购动力。'
  },
  {
    id: 15,
    title: '高峰期接单量控制',
    content: '老板，今天我们根据您店铺的实际出餐能力，优化了高峰期的接单量控制策略。主要是避免订单积压导致超时和差评，在保证服务质量的前提下合理接单。宁可少接几单保持高评分，也不要贪多导致体验下降。这种精细化的接单管理能有效提升客户满意度和店铺评分。'
  },
  {
    id: 16,
    title: '商品定价策略调整',
    content: '老板，今天我们分析了您店铺的商品定价结构。通过对比周边竞品和客户心理价位，我们对部分商品的价格做了微调，让定价更符合市场预期。定价不是越低越好，而是要在利润和竞争力之间找到平衡点。我们会根据销售数据持续测试不同价格策略，找到最优的定价组合。'
  },
  {
    id: 17,
    title: '店铺活动节奏规划',
    content: '老板，今天我们规划了您店铺下一阶段的活动节奏。外卖活动不能一直高强度，要有张有弛，让客户保持新鲜感。我们会在合适的时间节点推出针对性活动，既能刺激订单增长，又不会让客户产生"不活动不下单"的依赖心理。活动节奏把握好了，效果会更持久。'
  },
  {
    id: 18,
    title: '用户画像精准分析',
    content: '老板，今天我们深入分析了您店铺的用户画像数据。包括客户的年龄段、消费习惯、下单时间、偏好品类等。了解您的核心客户是谁，才能更精准地做商品推荐和营销策略。我们会根据这些画像数据，优化商品结构和运营方向，让每一次推广都能触达最合适的客户群体。'
  },
  {
    id: 19,
    title: '品牌形象与店铺包装',
    content: '老板，今天我们优化了您店铺的整体品牌形象。包括店铺logo、店招设计、商品分类命名、店铺简介等细节。外卖市场竞争激烈，品牌形象好的店铺更容易获得客户信任。我们会把您店铺的差异化优势通过视觉和文案充分展现出来，让客户一眼就能记住您的特色。'
  },
  {
    id: 20,
    title: '淡旺季应对策略',
    content: '老板，今天我们根据市场淡旺季规律，制定了您店铺的应对策略。淡季要控制成本、维护老客、优化产品；旺季要抓住机会、扩大曝光、冲刺销量。不同阶段的运营重点不一样，我们会提前布局，让您在淡季稳住基本盘，在旺季抓住爆发机会。外卖运营要有节奏感，不能一成不变。'
  }
];

export function ScriptSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (script: Script) => {
    try {
      await navigator.clipboard.writeText(script.content);
      setCopiedId(script.id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      alert('复制失败，请手动复制');
    }
  };

  return (
    <>
      {/* 折叠按钮 */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-1/2 -translate-y-1/2 z-50 bg-purple-600 text-white p-2 rounded-l-lg shadow-lg hover:bg-purple-700 transition-all ${
          isCollapsed ? 'right-0' : 'right-96'
        }`}
        title={isCollapsed ? '展开话术库' : '收起话术库'}
      >
        {isCollapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>

      {/* 侧边栏 */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 transition-all duration-300 z-40 ${
          isCollapsed ? 'translate-x-full' : 'translate-x-0'
        } w-96`}
      >
        <div className="h-full flex flex-col">
          {/* 头部 */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6" />
              <div>
                <h2 className="text-lg font-bold">每日群发话术库</h2>
                <p className="text-xs text-purple-100 mt-1">点击话术即可复制</p>
              </div>
            </div>
          </div>

          {/* 话术列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {scripts.map((script) => (
              <div
                key={script.id}
                onClick={() => handleCopy(script)}
                className="group relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg hover:border-purple-300 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {script.id}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {script.title}
                    </h3>
                  </div>
                  {copiedId === script.id ? (
                    <div className="flex items-center gap-1 text-green-600 text-xs font-medium whitespace-nowrap">
                      <Check className="h-4 w-4" />
                      已复制
                    </div>
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {script.content}
                </p>
                <div className="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>

          {/* 底部提示 */}
          <div className="border-t border-gray-200 p-3 bg-gray-50">
            <div className="text-xs text-gray-600 space-y-1">
              <p>💡 <span className="font-medium">使用建议：</span></p>
              <p className="pl-4">• 每天轮换使用不同话术</p>
              <p className="pl-4">• 建议下午4-5点发送</p>
              <p className="pl-4">• 可根据实际情况调整</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

