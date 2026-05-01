import { Web3Project, ProjectFilterOptions } from '../types/web3-project';

// 集中式 Web3 项目 mock 数据库
export const mockWeb3Projects: Web3Project[] = [
  {
    id: 'project-001',
    name: 'Lending Protocol Alpha',
    description: '去中心化借贷协议，支持多种资产抵押',
    category: 'DeFi',
    status: 'active',
    token: {
      symbol: 'LEND',
      name: 'Lending Token',
      chain: 'ethereum',
      price: 12.45,
      change24h: 2.3,
    },
    riskLevel: 'medium',
    riskScore: 68,
    riskMetrics: [
      { category: 'security', score: 82, description: '已审计，无重大安全漏洞' },
      { category: 'liquidity', score: 75, description: '流动性充足，深度良好' },
      { category: 'adoption', score: 60, description: '用户增长稳定但较慢' },
      { category: 'team', score: 55, description: '团队部分匿名' },
      { category: 'tokenomics', score: 70, description: '代币经济学设计合理' },
    ],
    tvl: 125000000,
    users: 8500,
    volume24h: 4500000,
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-04-30T12:00:00Z',
    tags: ['lending', 'defi', 'ethereum', 'audited'],
    websiteUrl: 'https://lending-protocol.example.com',
    contractAddress: '0x0000000000000000000000000000000000000001', // Fake 地址
  },
  {
    id: 'project-002',
    name: 'AI Agent Network',
    description: 'AI 智能体协作网络，支持自主任务执行',
    category: 'AI',
    status: 'launching',
    token: {
      symbol: 'AGENT',
      name: 'Agent Network Token',
      chain: 'solana',
      price: 0.85,
      change24h: -1.2,
    },
    riskLevel: 'high',
    riskScore: 42,
    riskMetrics: [
      { category: 'security', score: 65, description: '代码较新，未经过完整审计' },
      { category: 'liquidity', score: 30, description: '流动性较差，波动大' },
      { category: 'adoption', score: 25, description: '用户基数小，增长潜力待验证' },
      { category: 'team', score: 75, description: '团队实名，经验丰富' },
      { category: 'tokenomics', score: 35, description: '通胀模型有待观察' },
    ],
    tvl: 3800000,
    users: 1200,
    volume24h: 950000,
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-04-28T09:30:00Z',
    tags: ['ai', 'agents', 'solana', 'emerging'],
    websiteUrl: 'https://ai-agent-network.example.com',
    // 不包含 contractAddress（可选）
  },
  {
    id: 'project-003',
    name: 'NFT Marketplace Pro',
    description: '专业级 NFT 交易市场，支持多链资产',
    category: 'NFT',
    status: 'active',
    token: {
      symbol: 'NFTMP',
      name: 'NFT Marketplace Token',
      chain: 'polygon',
      price: 3.20,
      change24h: 5.7,
    },
    riskLevel: 'low',
    riskScore: 85,
    riskMetrics: [
      { category: 'security', score: 90, description: '多次审计，运行稳定' },
      { category: 'liquidity', score: 88, description: '流动性优秀，深度极好' },
      { category: 'adoption', score: 82, description: '市场份额领先，用户活跃' },
      { category: 'team', score: 80, description: '团队完全公开，履历优秀' },
      { category: 'tokenomics', score: 85, description: '代币模型经受市场考验' },
    ],
    tvl: 89000000,
    users: 45000,
    volume24h: 32000000,
    createdAt: '2022-11-05T00:00:00Z',
    updatedAt: '2024-04-29T15:45:00Z',
    tags: ['nft', 'marketplace', 'polygon', 'bluechip'],
    websiteUrl: 'https://nft-marketplace-pro.example.com',
    contractAddress: '0x0000000000000000000000000000000000000002', // Fake 地址
  },
];

// 工具函数：获取项目列表
export function getWeb3Projects(options: ProjectFilterOptions = {}): Web3Project[] {
  // 根据过滤选项筛选项目（后续实现）
  const filtered = mockWeb3Projects.filter(project => {
    if (options.categories && options.categories.length > 0) {
      if (!options.categories.includes(project.category)) return false;
    }
    if (options.riskLevels && options.riskLevels.length > 0) {
      if (!options.riskLevels.includes(project.riskLevel)) return false;
    }
    if (options.chains && options.chains.length > 0) {
      if (!project.token?.chain || !options.chains.includes(project.token.chain)) return false;
    }
    if (options.minRiskScore !== undefined && project.riskScore < options.minRiskScore) {
      return false;
    }
    if (options.maxRiskScore !== undefined && project.riskScore > options.maxRiskScore) {
      return false;
    }
    return true;
  });
  return [...filtered];
}

// 工具函数：按 ID 获取单个项目
export function getWeb3ProjectById(id: string): Web3Project | undefined {
  return mockWeb3Projects.find(project => project.id === id);
}

// 工具函数：获取项目统计
export function getProjectStats() {
  const totalProjects = mockWeb3Projects.length;
  const totalValue = mockWeb3Projects.reduce((sum, p) => sum + (p.tvl || 0), 0);
  const avgRiskScore = mockWeb3Projects.reduce((sum, p) => sum + p.riskScore, 0) / totalProjects;
  
  const categories = mockWeb3Projects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byChain = mockWeb3Projects.reduce((acc, p) => {
    if (p.token?.chain) {
      acc[p.token.chain] = (acc[p.token.chain] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalProjects,
    totalValue,
    avgRiskScore: Math.round(avgRiskScore),
    byChain,
    categories,
  };
}