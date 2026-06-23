"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Web3Project, ProjectFilterOptions } from '@/types/web3-project';
import {
  getWeb3Projects as getLocalWeb3Projects,
  getProjectStats as getLocalStats,
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
  stats: ReturnType<typeof getLocalStats>;
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
 * 优先从 /api/web3-projects 获取数据，API 失败时 fallback 到本地数据。
 */
export function useWeb3Projects(options?: Web3ProjectQueryOptions): UseWeb3ProjectsReturn {
  // ---- raw data from API (or fallback) ----
  const [allProjects, setAllProjects] = useState<Web3Project[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getLocalStats> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ---- fetch data ----
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/web3-projects');
      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }
      const data = await res.json();
      setAllProjects(data.projects ?? []);
      setStats(data.stats ?? getLocalStats());
    } catch (err) {
      console.warn('[useWeb3Projects] API failed, falling back to local data', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      // Fallback: use local data so the UI never breaks
      setAllProjects(getLocalWeb3Projects({}));
      setStats(getLocalStats());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ---- apply client-side options (search, sort, filter) on the source list ----
  const projects = useMemo(() => {
    const {
      searchQuery = '',
      sortBy,
      sortOrder = 'desc',
      ...filterOptions
    } = options ?? {};

    // Apply filter options on allProjects (mirrors getWeb3Projects logic)
    let filtered = allProjects;

    if (filterOptions.categories && filterOptions.categories.length > 0) {
      filtered = filtered.filter((p) => filterOptions.categories!.includes(p.category));
    }
    if (filterOptions.riskLevels && filterOptions.riskLevels.length > 0) {
      filtered = filtered.filter((p) => filterOptions.riskLevels!.includes(p.riskLevel));
    }
    if (filterOptions.chains && filterOptions.chains.length > 0) {
      filtered = filtered.filter(
        (p) => p.token?.chain && filterOptions.chains!.includes(p.token.chain)
      );
    }
    if (filterOptions.minRiskScore !== undefined) {
      filtered = filtered.filter((p) => p.riskScore >= filterOptions.minRiskScore!);
    }
    if (filterOptions.maxRiskScore !== undefined) {
      filtered = filtered.filter((p) => p.riskScore <= filterOptions.maxRiskScore!);
    }

    return sortProjects(
      filtered.filter((project) => projectMatchesSearch(project, searchQuery)),
      sortBy,
      sortOrder
    );
  }, [options, allProjects]);

  // ---- stable stats (never return null to consumers) ----
  const stableStats = useMemo(
    () => stats ?? getLocalStats(),
    [stats]
  );

  // ---- refetch ----
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    projects,
    stats: stableStats,
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

    return getLocalWeb3Projects({}).find((p) => p.id === projectId);
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
