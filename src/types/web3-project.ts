// Web3 项目基础类型定义
export interface ProjectToken {
  symbol: string;
  name: string;
  address?: string;  // 可选合约地址
  chain: string;     // 链标识：ethereum/solana/polygon/bsc
  price?: number;
  change24h?: number;
}

export interface ProjectRiskMetric {
  category: 'security' | 'liquidity' | 'adoption' | 'team' | 'tokenomics';
  score: number;  // 0-100
  description: string;
}

export interface Web3Project {
  id: string;
  name: string;
  description: string;
  category: 'DeFi' | 'NFT' | 'GameFi' | 'Infra' | 'AI' | 'Social';
  status: 'active' | 'launching' | 'testing' | 'deprecated';
  
  // Token 信息
  token?: ProjectToken;
  
  // 风险评估
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskMetrics: ProjectRiskMetric[];
  riskScore: number;  // 综合分 0-100
  
  // 市场数据
  tvl?: number;       // 总锁定价值
  users?: number;
  volume24h?: number;
  
  // 元数据
  createdAt: string;  // ISO 日期
  updatedAt: string;
  tags: string[];
  websiteUrl?: string;
  contractAddress?: string; // 明显 fake 地址示例格式
}

// 扩展类型：项目列表过滤选项
export interface ProjectFilterOptions {
  categories?: Web3Project['category'][];
  riskLevels?: Web3Project['riskLevel'][];
  chains?: string[];
  minRiskScore?: number;
  maxRiskScore?: number;
}

// 扩展类型：项目排名指标
export interface ProjectRankMetric {
  projectId: string;
  metricName: string;
  value: number;
  change?: number;
}