"use client";

import { useState, useMemo } from 'react';
import { Web3Project, ProjectFilterOptions } from '@/types/web3-project';
import {
  getWeb3Projects as fetchProjects,
  getProjectStats
} from '@/data/web3-projects';

export type ProjectSortBy = 'riskScore' | 'name' | 'category' | 'riskLevel';
export type ProjectSortOrder = 'asc' | 'desc';

export interface Web3ProjectQueryOptions extends ProjectFilterOptions {
  searchQuery?: string;
  sortBy?: ProjectSortBy;
  sortOrder?: ProjectSortOrder;
}

export interface UseWeb3ProjectsReturn {
  projects: Web3Project[];
  stats: ReturnType<typeof getProjectStats>;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

function getProjectRiskScore(project: Web3Project): number {
  const projectWithScore = project as Web3Project & {
    riskScore?: number;
    riskMetrics?: {
      overall?: number;
      score?: number;
      overallScore?: number;
    };
  };

  if (typeof projectWithScore.riskScore === 'number') {
    return projectWithScore.riskScore;
  }

  if (typeof projectWithScore.riskMetrics?.overall === 'number') {
    return projectWithScore.riskMetrics.overall;
  }

  if (typeof projectWithScore.riskMetrics?.overallScore === 'number') {
    return projectWithScore.riskMetrics.overallScore;
  }

  if (typeof projectWithScore.riskMetrics?.score === 'number') {
    return projectWithScore.riskMetrics.score;
  }

  return 0;
}

function getRiskLevelWeight(project: Web3Project): number {
  const weights: Record<Web3Project['riskLevel'], number> = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  };

  return weights[project.riskLevel] ?? 0;
}

function projectMatchesSearch(project: Web3Project, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    project.name,
    project.description,
    project.category,
    project.riskLevel,
    project.status,
    ...(project.tags ?? []),
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

function sortProjects(
  projects: Web3Project[],
  sortBy?: ProjectSortBy,
  sortOrder: ProjectSortOrder = 'desc'
): Web3Project[] {
  if (!sortBy) {
    return projects;
  }

  const direction = sortOrder === 'asc' ? 1 : -1;

  return [...projects].sort((a, b) => {
    if (sortBy === 'riskScore') {
      return (getProjectRiskScore(a) - getProjectRiskScore(b)) * direction;
    }

    if (sortBy === 'riskLevel') {
      return (getRiskLevelWeight(a) - getRiskLevelWeight(b)) * direction;
    }

    const left = String(a[sortBy] ?? '').toLowerCase();
    const right = String(b[sortBy] ?? '').toLowerCase();

    return left.localeCompare(right) * direction;
  });
}

/**
 * Web3 项目数据 hook
 *
 * 提供统一的项目数据访问接口，目前使用本地 mock 数据。
 * 支持原有过滤能力，并增加搜索与排序能力。
 */
export function useWeb3Projects(options?: Web3ProjectQueryOptions): UseWeb3ProjectsReturn {
  const projects = useMemo(() => {
    const {
      searchQuery = '',
      sortBy,
      sortOrder = 'desc',
      ...filterOptions
    } = options ?? {};

    const filteredProjects = fetchProjects(filterOptions as ProjectFilterOptions)
      .filter((project) => projectMatchesSearch(project, searchQuery));

    return sortProjects(filteredProjects, sortBy, sortOrder);
  }, [options]);

  const stats = useMemo(() => {
    return getProjectStats();
  }, []);

  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const refetch = () => {
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

export function useWeb3Project(projectId?: string): {
  project: Web3Project | undefined;
  isLoading: boolean;
  error: string | null;
} {
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const project = useMemo(() => {
    if (!projectId) return undefined;

    return fetchProjects({}).find(p => p.id === projectId);
  }, [projectId]);

  return {
    project,
    isLoading,
    error,
  };
}

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
