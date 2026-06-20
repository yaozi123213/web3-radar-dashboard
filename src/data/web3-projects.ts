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
  {
    id: 'project-004',
    name: 'Galactic Warriors',
    description: '区块链游戏元宇宙，P2E 模式整合战略对战与资产交易',
    category: 'GameFi',
    status: 'active',
    token: {
      symbol: 'GWAR',
      name: 'Galactic Token',
      chain: 'bnb',
      price: 0.45,
      change24h: 8.2,
    },
    riskLevel: 'medium',
    riskScore: 62,
    riskMetrics: [
      { category: 'security', score: 70, description: '智能合约已审计，无高危漏洞' },
      { category: 'liquidity', score: 65, description: '流动性中等，交易活跃度波动' },
      { category: 'adoption', score: 55, description: '用户增长较快但留存偏低' },
      { category: 'team', score: 60, description: '团队半公开，有游戏行业背景' },
      { category: 'tokenomics', score: 58, description: '代币通胀模型，需观察可持续性' },
    ],
    tvl: 25000000,
    users: 32000,
    volume24h: 5800000,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-04-25T10:00:00Z',
    tags: ['gamefi', 'p2e', 'bnb', 'metaverse'],
    websiteUrl: 'https://galactic-warriors.example.com',
    contractAddress: '0x0000000000000000000000000000000000000004', // Fake 地址
  },
  {
    id: 'project-005',
    name: 'Meta Arena',
    description: '竞技型链游平台，支持玩家自主创建比赛和赌注池',
    category: 'GameFi',
    status: 'launching',
    token: {
      symbol: 'META',
      name: 'Meta Arena Token',
      chain: 'polygon',
      price: 0.12,
      change24h: 15.3,
    },
    riskLevel: 'high',
    riskScore: 38,
    riskMetrics: [
      { category: 'security', score: 55, description: '代码未完成第三方审计' },
      { category: 'liquidity', score: 25, description: '流动性极低，上线初期' },
      { category: 'adoption', score: 20, description: '测试阶段，用户基数小' },
      { category: 'team', score: 45, description: '团队部分匿名，背景可查' },
      { category: 'tokenomics', score: 42, description: '代币分配待公布' },
    ],
    tvl: 500000,
    users: 800,
    volume24h: 120000,
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-04-28T16:00:00Z',
    tags: ['gamefi', 'competitive', 'polygon', 'emerging'],
    websiteUrl: 'https://meta-arena.example.com',
    contractAddress: '0x0000000000000000000000000000000000000005', // Fake 地址
  },
  {
    id: 'project-006',
    name: 'ChainBridge Protocol',
    description: '跨链桥基础设施，支持 10+ 公链资产无缝转移',
    category: 'Infra',
    status: 'active',
    token: {
      symbol: 'CBR',
      name: 'ChainBridge Token',
      chain: 'ethereum',
      price: 2.15,
      change24h: -0.8,
    },
    riskLevel: 'low',
    riskScore: 82,
    riskMetrics: [
      { category: 'security', score: 88, description: '多次审计，跨链桥经验证安全' },
      { category: 'liquidity', score: 80, description: '流动性良好，TVL 稳定' },
      { category: 'adoption', score: 78, description: '多链覆盖，用户活跃' },
      { category: 'team', score: 85, description: '团队实名，工程能力突出' },
      { category: 'tokenomics', score: 78, description: '代币有实际用途支撑' },
    ],
    tvl: 180000000,
    users: 22000,
    volume24h: 15000000,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-04-30T08:00:00Z',
    tags: ['infra', 'bridge', 'ethereum', 'bluechip'],
    websiteUrl: 'https://chainbridge-protocol.example.com',
    contractAddress: '0x0000000000000000000000000000000000000006', // Fake 地址
  },
  {
    id: 'project-007',
    name: 'LayerZero Oracle',
    description: '去中心化预言机网络，为智能合约提供链上数据馈送',
    category: 'Infra',
    status: 'active',
    token: {
      symbol: 'LZRO',
      name: 'LayerZero Oracle Token',
      chain: 'solana',
      price: 4.80,
      change24h: 3.1,
    },
    riskLevel: 'medium',
    riskScore: 70,
    riskMetrics: [
      { category: 'security', score: 76, description: '数据源验证机制完善' },
      { category: 'liquidity', score: 72, description: '流动性中等，深度尚可' },
      { category: 'adoption', score: 68, description: '已接入 20+ DApp' },
      { category: 'team', score: 70, description: '团队有基础设施背景' },
      { category: 'tokenomics', score: 65, description: '代币质押模型合理' },
    ],
    tvl: 62000000,
    users: 15000,
    volume24h: 3200000,
    createdAt: '2023-04-10T00:00:00Z',
    updatedAt: '2024-04-29T11:30:00Z',
    tags: ['infra', 'oracle', 'solana', 'defi-adjacent'],
    websiteUrl: 'https://layerzero-oracle.example.com',
    contractAddress: '0x0000000000000000000000000000000000000007', // Fake 地址
  },
  {
    id: 'project-008',
    name: 'Yield Optimizer Vault',
    description: '自动化收益聚合器，跨协议优化 DeFi 质押回报',
    category: 'DeFi',
    status: 'active',
    token: {
      symbol: 'YOV',
      name: 'Yield Optimizer Token',
      chain: 'bnb',
      price: 1.30,
      change24h: 4.5,
    },
    riskLevel: 'low',
    riskScore: 78,
    riskMetrics: [
      { category: 'security', score: 85, description: '合约经过多轮审计' },
      { category: 'liquidity', score: 78, description: '资金池流动性充足' },
      { category: 'adoption', score: 72, description: '用户增长稳健' },
      { category: 'team', score: 80, description: '团队实名，有 DeFi 经验' },
      { category: 'tokenomics', score: 75, description: '收益分成模型透明' },
    ],
    tvl: 95000000,
    users: 18000,
    volume24h: 7800000,
    createdAt: '2023-07-20T00:00:00Z',
    updatedAt: '2024-04-28T14:00:00Z',
    tags: ['defi', 'yield', 'bnb', 'vault'],
    websiteUrl: 'https://yield-optimizer.example.com',
    contractAddress: '0x0000000000000000000000000000000000000008', // Fake 地址
  },
  {
    id: 'project-009',
    name: 'StableSwap DEX',
    description: '稳定币兑换 DEX，低滑点算法专注于稳定资产交换',
    category: 'DeFi',
    status: 'active',
    token: {
      symbol: 'SSWAP',
      name: 'StableSwap Token',
      chain: 'polygon',
      price: 0.55,
      change24h: 1.2,
    },
    riskLevel: 'medium',
    riskScore: 65,
    riskMetrics: [
      { category: 'security', score: 72, description: '已审计，无已知漏洞' },
      { category: 'liquidity', score: 68, description: '流动性中等，集中度偏高' },
      { category: 'adoption', score: 60, description: '区域性用户基础' },
      { category: 'team', score: 65, description: '团队半匿名' },
      { category: 'tokenomics', score: 60, description: '交易费分润模型' },
    ],
    tvl: 42000000,
    users: 12000,
    volume24h: 12500000,
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2024-04-27T09:45:00Z',
    tags: ['defi', 'dex', 'polygon', 'stablecoin'],
    websiteUrl: 'https://stableswap-dex.example.com',
    contractAddress: '0x0000000000000000000000000000000000000009', // Fake 地址
  },
  {
    id: 'project-010',
    name: 'Compute Marketplace',
    description: '去中心化算力市场，AI 训练和推理任务点对点交易',
    category: 'AI',
    status: 'launching',
    token: {
      symbol: 'COMP',
      name: 'Compute Token',
      chain: 'ethereum',
      price: 0.95,
      change24h: 6.8,
    },
    riskLevel: 'high',
    riskScore: 45,
    riskMetrics: [
      { category: 'security', score: 60, description: '代码开源但未审计' },
      { category: 'liquidity', score: 35, description: '流动性不足' },
      { category: 'adoption', score: 30, description: '早期用户群' },
      { category: 'team', score: 70, description: '团队实名，AI 背景强' },
      { category: 'tokenomics', score: 40, description: '通缩模型待验证' },
    ],
    tvl: 2800000,
    users: 2500,
    volume24h: 680000,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-04-26T18:00:00Z',
    tags: ['ai', 'compute', 'ethereum', 'emerging'],
    websiteUrl: 'https://compute-marketplace.example.com',
    contractAddress: '0x0000000000000000000000000000000000000010', // Fake 地址
  },
  {
    id: 'project-011',
    name: 'DePIN Storage Network',
    description: '去中心化物理基础设施网络，分布式存储代币激励',
    category: 'AI',
    status: 'active',
    token: {
      symbol: 'DPIN',
      name: 'DePIN Token',
      chain: 'solana',
      price: 1.85,
      change24h: -2.1,
    },
    riskLevel: 'medium',
    riskScore: 58,
    riskMetrics: [
      { category: 'security', score: 68, description: '基础架构安全，生态扩展中' },
      { category: 'liquidity', score: 55, description: '流动性一般' },
      { category: 'adoption', score: 50, description: '存储节点增长中' },
      { category: 'team', score: 65, description: '团队有分布式系统背景' },
      { category: 'tokenomics', score: 52, description: '存储即挖矿模型' },
    ],
    tvl: 15000000,
    users: 8000,
    volume24h: 2100000,
    createdAt: '2023-11-10T00:00:00Z',
    updatedAt: '2024-04-28T12:00:00Z',
    tags: ['ai', 'depin', 'storage', 'solana'],
    websiteUrl: 'https://depin-storage.example.com',
    contractAddress: '0x0000000000000000000000000000000000000011', // Fake 地址
  },
  {
    id: 'project-012',
    name: 'Music NFT Platform',
    description: '音乐人 NFT 发行平台，支持版税自动分配和粉丝共创',
    category: 'NFT',
    status: 'active',
    token: {
      symbol: 'MUSE',
      name: 'Muse Token',
      chain: 'ethereum',
      price: 2.50,
      change24h: 3.4,
    },
    riskLevel: 'low',
    riskScore: 76,
    riskMetrics: [
      { category: 'security', score: 82, description: '合约已审计，版税逻辑验证' },
      { category: 'liquidity', score: 70, description: '二级市场活跃' },
      { category: 'adoption', score: 65, description: '音乐人入驻增长' },
      { category: 'team', score: 78, description: '团队有音乐产业资源' },
      { category: 'tokenomics', score: 72, description: '版税分润模型可持续' },
    ],
    tvl: 18000000,
    users: 28000,
    volume24h: 4500000,
    createdAt: '2023-08-15T00:00:00Z',
    updatedAt: '2024-04-29T13:20:00Z',
    tags: ['nft', 'music', 'ethereum', 'creator'],
    websiteUrl: 'https://music-nft.example.com',
    contractAddress: '0x0000000000000000000000000000000000000012', // Fake 地址
  },
  {
    id: 'project-013',
    name: 'Domain Name Protocol',
    description: '多链域名注册协议，统一身份与跨链地址解析',
    category: 'NFT',
    status: 'launching',
    token: {
      symbol: 'DOM',
      name: 'Domain Name Token',
      chain: 'bnb',
      price: 0.08,
      change24h: -0.5,
    },
    riskLevel: 'medium',
    riskScore: 55,
    riskMetrics: [
      { category: 'security', score: 65, description: '基础域名合约审计完成' },
      { category: 'liquidity', score: 45, description: '流动性偏低' },
      { category: 'adoption', score: 40, description: '早期采用阶段' },
      { category: 'team', score: 60, description: '团队有域名行业经验' },
      { category: 'tokenomics', score: 55, description: '注册费分润模型' },
    ],
    tvl: 5200000,
    users: 9500,
    volume24h: 380000,
    createdAt: '2024-02-25T00:00:00Z',
    updatedAt: '2024-04-28T10:15:00Z',
    tags: ['nft', 'domains', 'bnb', 'identity'],
    websiteUrl: 'https://domain-name-protocol.example.com',
    contractAddress: '0x0000000000000000000000000000000000000013', // Fake 地址
  },
  {
    id: 'project-014',
    name: 'RWA Tokenization Hub',
    description: '真实世界资产代币化平台，合规框架下连接 TradFi 与 DeFi',
    category: 'DeFi',
    status: 'launching',
    token: {
      symbol: 'RWA',
      name: 'RWA Token',
      chain: 'ethereum',
      price: 5.60,
      change24h: 0.3,
    },
    riskLevel: 'critical',
    riskScore: 28,
    riskMetrics: [
      { category: 'security', score: 45, description: '合规审计进行中，监管风险高' },
      { category: 'liquidity', score: 30, description: '流动性极低，代币锁定期长' },
      { category: 'adoption', score: 15, description: '概念验证阶段' },
      { category: 'team', score: 50, description: '团队有传统金融背景，但实名度不足' },
      { category: 'tokenomics', score: 25, description: '代币模型依赖合规背书' },
    ],
    tvl: 1500000,
    users: 450,
    volume24h: 85000,
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-30T06:00:00Z',
    tags: ['defi', 'rwa', 'ethereum', 'regulated'],
    websiteUrl: 'https://rwa-tokenization.example.com',
    contractAddress: '0x0000000000000000000000000000000000000014', // Fake 地址
  },
  {
    id: 'project-015',
    name: 'CrossChain Data Indexer',
    description: '多链数据索引协议，提供统一查询接口和开发工具',
    category: 'Infra',
    status: 'active',
    token: {
      symbol: 'INDEX',
      name: 'Indexer Token',
      chain: 'polygon',
      price: 0.75,
      change24h: 1.8,
    },
    riskLevel: 'medium',
    riskScore: 72,
    riskMetrics: [
      { category: 'security', score: 78, description: '数据验证机制稳健' },
      { category: 'liquidity', score: 70, description: '流动性充足' },
      { category: 'adoption', score: 75, description: '已服务 50+ 开发者团队' },
      { category: 'team', score: 75, description: '团队公开，技术实力强' },
      { category: 'tokenomics', score: 68, description: '查询付费+质押模型' },
    ],
    tvl: 38000000,
    users: 12000,
    volume24h: 2800000,
    createdAt: '2023-10-01T00:00:00Z',
    updatedAt: '2024-04-30T07:30:00Z',
    tags: ['infra', 'indexer', 'polygon', 'developer-tools'],
    websiteUrl: 'https://crosschain-indexer.example.com',
    contractAddress: '0x0000000000000000000000000000000000000015', // Fake 地址
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