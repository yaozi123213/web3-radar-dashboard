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
  );
};
