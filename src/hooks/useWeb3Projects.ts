"use client";

import { useState, useMemo } from 'react';
import { Web3Project, ProjectFilterOptions } from '@/types/web3-project';
import { 
  getWeb3Projects as fetchProjects, 
  getProjectStats 
} from '@/data/web3-projects';

export interface UseWeb3ProjectsReturn {
  // 项目列表
  projects: Web3Project[];
  // 项目统计信息
  stats: ReturnType<typeof getProjectStats>;
  // 加载状态（目前始终为false，保留用于未来API集成）
  isLoading: boolean;
  // 错误信息（目前始终为null，保留用于未来错误处理）
  error: string | null;
  // 重新加载数据（目前为空函数，保留用于未来刷新）
  refetch: () => void;
}

/**
 * Web3 项目数据 hook
 * 
 * 提供统一的项目数据访问接口，目前使用本地mock数据，
 * 未来可无缝切换到API数据源
 * 
 * @param options 过滤选项：categories, riskLevels, chains, minRiskScore, maxRiskScore
 * @returns {UseWeb3ProjectsReturn} 包含项目数据、统计、状态信息的对象
 */
export function useWeb3Projects(options?: ProjectFilterOptions): UseWeb3ProjectsReturn {
  // 使用 useMemo 缓存项目数据，避免每次渲染重新计算
  const projects = useMemo(() => {
    return fetchProjects(options || {});
  }, [options]);

  // 使用 useMemo 缓存统计信息
  const stats = useMemo(() => {
    return getProjectStats();
  }, [projects]); // 依赖 projects，但 stats 是全局不依赖过滤结果

  // 状态管理 - 目前为本地数据，始终为 false/null
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  // 重新加载函数 - 目前为空实现，未来可集成API刷新
  const refetch = () => {
    // 保留此函数用于未来API集成时的数据刷新
    console.log('useWeb3Projects: refetch called (本地模式，无操作)');
  };

  return {
    projects,
    stats,
    isLoading,
    error,
    refetch,
  };
}

/**
 * 辅助 hook：获取单个项目详情
 * 
 * @param projectId 项目ID
 * @returns 单个项目详情或undefined
 */
export function useWeb3Project(projectId?: string): {
  project: Web3Project | undefined;
  isLoading: boolean;
  error: string | null;
} {
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const project = useMemo(() => {
    if (!projectId) return undefined;
    
    // 此处未来可替换为API调用
    return fetchProjects({}).find(p => p.id === projectId);
  }, [projectId]);

  return {
    project,
    isLoading,
    error,
  };
}

/**
 * 辅助 hook：获取按风险评估过滤的项目
 * 
 * @param riskLevel 风险等级：'low' | 'medium' | 'high' | 'critical'
 * @returns 过滤后的项目列表和相关状态
 */
export function useWeb3ProjectsByRisk(riskLevel: Web3Project['riskLevel']): {
  projects: Web3Project[];
  isLoading: boolean;
  error: string | null;
} {
  const { projects, isLoading, error } = useWeb3Projects({ riskLevels: [riskLevel] });
  
  return {
    projects,
    isLoading,
    error,
  };
}

/**
 * 辅助 hook：获取按链过滤的项目
 * 
 * @param chain 链标识：'ethereum' | 'solana' | 'polygon' | 'bsc'
 * @returns 过滤后的项目列表和相关状态
 */
export function useWeb3ProjectsByChain(chain: string): {
  projects: Web3Project[];
  isLoading: boolean;
  error: string | null;
} {
  const { projects, isLoading, error } = useWeb3Projects({ chains: [chain] });
  
  return {
    projects,
    isLoading,
    error,
  };
}