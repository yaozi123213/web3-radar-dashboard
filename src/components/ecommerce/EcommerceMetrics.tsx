"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";
import { useWeb3Projects } from "@/hooks/useWeb3Projects";

export const EcommerceMetrics = () => {
  const { projects, stats, isLoading } = useWeb3Projects();

  const highRiskCount = projects.filter(
    (project) => project.riskLevel === "high" || project.riskLevel === "critical"
  ).length;
  const criticalCount = projects.filter((project) => project.riskLevel === "critical").length;
  const totalChains = Object.keys(stats.byChain).length;
  const topRiskProject = [...projects].sort((a, b) => a.riskScore - b.riskScore)[0];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="animate-pulse h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-700 rounded mt-2 w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-error-200 bg-error-50 p-5 dark:border-error-500/30 dark:bg-error-500/10 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex rounded-full bg-error-100 px-3 py-1 text-xs font-semibold text-error-600 dark:bg-error-500/20 dark:text-error-400">
              Critical Alert Banner
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Web3 Risk Radar is monitoring {highRiskCount} high / critical signal{highRiskCount === 1 ? "" : "s"}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Highest risk project: <span className="font-semibold">{topRiskProject?.name ?? "N/A"}</span> · Last scan status: mock data
            </p>
          </div>
          <div className="rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-300">
            Mode: local watchlist · API: not connected
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Radar Projects
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {stats.totalProjects}
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              Watchlist
            </Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                High / Critical Alerts
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {highRiskCount}
              </h4>
            </div>

            <Badge color={criticalCount > 0 ? "error" : "warning"}>
              <ArrowDownIcon className="text-error-500" />
              Needs review
            </Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Chains Covered
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {totalChains}
              </h4>
            </div>

            <Badge color="success">
              <ArrowUpIcon />
              Multi-chain
            </Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 dark:text-white/90" />
          </div>
          <div className="mt-5">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Top Risk Project
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {topRiskProject?.name ?? "N/A"}
            </h4>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Score {topRiskProject?.riskScore ?? "N/A"} · {topRiskProject?.riskLevel ?? "unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
